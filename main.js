const { app, BrowserWindow, ipcMain, safeStorage, Tray, Menu, powerSaveBlocker, shell, session, Notification, nativeImage } = require('electron');
const path = require('path');
const fs = require('fs');

// O Chromium despeja muito log inutil no terminal (WebRTC do jogo, DNS, etc.).
// Silencia tudo que nao for fatal — e so console, nao muda o comportamento.
app.commandLine.appendSwitch('log-level', '3');

// ===== Relatorio de erros =====
// Todo problema (crash, excecao, mensagem da interface) cai num arquivo dentro de
// userData que o usuario pode abrir e mandar pro suporte. Nunca some com erro.
const arquivoErro = () => path.join(app.getPath('userData'), 'relatorio-de-erros.log');
let cabecalhoEscrito = false;
function registrar(origem, detalhe) {
  try {
    const f = arquivoErro();
    try { if (fs.statSync(f).size > 512 * 1024) fs.renameSync(f, f.replace(/\.log$/, '.antigo.log')); } catch {}
    if (!cabecalhoEscrito) {
      cabecalhoEscrito = true;
      fs.appendFileSync(f, `\n=== sessao de ${new Date().toLocaleString('pt-BR')} · IdlePokeGrid v${app.getVersion()} · Electron ${process.versions.electron} · ${process.platform} ${require('os').release()} ===\n`);
    }
    fs.appendFileSync(f, `[${new Date().toLocaleString('pt-BR')}] [${origem}] ${String(detalhe).slice(0, 4000)}\n`);
  } catch {}
}
process.on('uncaughtException', (e) => {
  registrar('app', (e && e.stack) || e);
  // erro nao previsto nao pode deixar o processo vivo e nenhuma janela na tela
  try { const w = BrowserWindow.getAllWindows()[0]; if (w && !w.isDestroyed() && !w.isVisible()) { w.show(); w.maximize(); } } catch {}
});
process.on('unhandledRejection', (e) => registrar('app-promise', (e && e.stack) || e));
app.on('child-process-gone', (_e, d) => { if (d && d.reason !== 'clean-exit') registrar('processo-' + (d.type || '?'), d.reason + (d.exitCode != null ? ' (exit ' + d.exitCode + ')' : '')); });

// ===== Canais de IPC =====
// errlog:write vem do onerror da interface; errlog:open mostra o arquivo selecionado.
ipcMain.handle('errlog:write', (_e, origem, msg) => { if (typeof origem === 'string' && typeof msg === 'string') registrar(origem.slice(0, 40), msg); });
ipcMain.handle('errlog:open', () => {
  try {
    if (!fs.existsSync(arquivoErro())) fs.writeFileSync(arquivoErro(), 'Nenhum erro registrado ainda. / No errors recorded yet.\n');
    shell.showItemInFolder(arquivoErro());
  } catch {}
});
// backup:save guarda configs (automatico semanal e export manual). O nome vem da
// interface, entao e tratado como hostil: so basename, charset restrito e teto de 2MB.
ipcMain.handle('backup:save', (_e, nome, conteudo, cabecalho) => {
  try {
    if (typeof nome !== 'string' || typeof conteudo !== 'string') return false;
    nome = path.basename(nome);
    if (!/^[\w.-]{1,60}$/.test(nome) || conteudo.length > 2e6) return false;
    const dir = path.join(app.getPath('userData'), 'backups');
    fs.mkdirSync(dir, { recursive: true });
    const alvo = path.join(dir, nome);
    // anexar so faz sentido em csv/log/txt; JSON anexado vira lixo que nao restaura mais
    const anexavel = /\.(csv|log|txt)$/i.test(nome);
    if (anexavel && fs.existsSync(alvo)) fs.appendFileSync(alvo, conteudo);
    else fs.writeFileSync(alvo, (typeof cabecalho === 'string' ? cabecalho : '') + conteudo);
    const prefixo = nome.replace(/[\d-]+\.\w+$/, '');
    const irmaos = fs.readdirSync(dir).filter((f) => f.startsWith(prefixo)).sort();
    while (irmaos.length > 12) { try { fs.unlinkSync(path.join(dir, irmaos.shift())); } catch { break; } }
    return true;
  } catch (e) { try { registrar('backup', String(e && e.message).slice(0, 200)); } catch {} return false; }
});

// conta:limpar apaga cookies/cache/storage de UMA particao (conta). A senha salva do
// treinador nao mora na particao, entao sobrevive. Resolve conta travada sem mexer nas outras.
ipcMain.handle('conta:limpar', async (_e, i) => {
  i = Math.trunc(+i);
  if (!(i >= 0 && i <= 3)) return false;
  try {
    const ses = session.fromPartition('persist:conta' + (i + 1));
    await ses.clearStorageData();
    await ses.clearCache();
    return true;
  } catch (e) { try { registrar('conta', 'limpar conta' + i + ': ' + String(e && e.message).slice(0, 150)); } catch {} return false; }
});

// Instancia unica: abrir o app de novo apenas foca a janela que ja esta aberta.
if (!app.requestSingleInstanceLock()) app.quit();

// ===== Seguranca dos paineis =====
// O painel so pode estar no dominio do jogo. Navegar pra fora (ou abrir popup) vai pro
// navegador padrao, nunca dentro da janela com a sessao logada.
const GAME = 'https://idlepoke.com';
const abreFora = (url) => { if (/^https?:\/\//i.test(url)) shell.openExternal(url); };
const mesmoJogo = (u) => { try { return new URL(u).origin === new URL(GAME).origin; } catch { return false; } };
app.on('web-contents-created', (_e, contents) => {
  if (contents.getType() !== 'webview') return;
  contents.setWindowOpenHandler(({ url }) => { abreFora(url); return { action: 'deny' }; });
  const guarda = (e, url) => { if (!mesmoJogo(url) && url !== 'about:blank') { e.preventDefault(); abreFora(url); } };
  contents.on('will-navigate', guarda);
  contents.on('will-redirect', guarda);
  // painel que morreu (crash/OOM) volta sozinho
  contents.on('render-process-gone', (_ev, d) => {
    if (d.reason !== 'clean-exit') {
      registrar('painel', 'processo do painel caiu: ' + d.reason + (d.exitCode != null ? ' (exit ' + d.exitCode + ')' : ''));
      setTimeout(() => { try { contents.reload(); } catch {} }, 1500);
    }
  });
  // painel travou (processo vivo, sem responder): 20s de tolerancia e derrubamos de
  // proposito; o handler acima recarrega sozinho
  let hang = null;
  contents.on('unresponsive', () => {
    registrar('painel', 'painel travou (sem responder)');
    clearTimeout(hang);
    hang = setTimeout(() => { try { if (!contents.isDestroyed()) contents.forcefullyCrashRenderer(); } catch {} }, 20000);
  });
  contents.on('responsive', () => { clearTimeout(hang); registrar('painel', 'painel voltou a responder'); });
  contents.on('destroyed', () => clearTimeout(hang));
  // Esc com o jogo focado desexpande o painel SEM consumir a tecla (o jogo usa Esc
  // nos dialogos). Por isso nao e um accelerator de menu, que engoliria a tecla.
  contents.on('before-input-event', (_ev, input) => {
    if (input.type === 'keyDown' && input.key === 'Escape' && !input.isAutoRepeat) {
      try { contents.hostWebContents && contents.hostWebContents.send('hotkey', 'collapse'); } catch {}
    }
  });
  // clique direito no jogo alterna o modo foco. Campo editavel fica de fora, senao o
  // clique de colar num input viraria tela cheia.
  contents.on('context-menu', (_ev, params) => {
    if (params && params.isEditable) return;
    try { contents.hostWebContents && contents.hostWebContents.send('hotkey', 'ctx' + contents.id); } catch {}
  });
});

// ===== Credenciais salvas =====
// Contas ficam criptografadas em disco (safeStorage/DPAPI do Windows). Se o SO nao
// oferecer criptografia, grava texto puro como fallback — e senha de jogo, nao de banco.
const arquivoCreds = () => path.join(app.getPath('userData'), 'accounts.enc');
ipcMain.handle('creds:load', () => {
  let buf;
  try { buf = fs.readFileSync(arquivoCreds()); } catch { return []; }
  try {
    if (safeStorage.isEncryptionAvailable()) return JSON.parse(safeStorage.decryptString(buf));
    return JSON.parse(buf.toString('utf8'));
  } catch {
    // ilegivel (ex.: chave mudou apos upgrade do Electron): preserva antes que um
    // save por cima destrua a unica copia
    try { fs.copyFileSync(arquivoCreds(), arquivoCreds() + '.bak-' + Date.now()); } catch {}
    return [];
  }
});
ipcMain.handle('creds:save', (_e, contas) => {
  const json = JSON.stringify(contas);
  const data = safeStorage.isEncryptionAvailable() ? safeStorage.encryptString(json) : Buffer.from(json, 'utf8');
  const f = arquivoCreds();
  fs.writeFileSync(f + '.tmp', data);
  fs.renameSync(f + '.tmp', f); // troca atomica: fechar no meio nao corrompe
  return true;
});

// User-Agent limpo pro jogo: tira o token Electron/... e congela a versao do Chrome em
// .0.0.0 pra casar com os client hints (Cloudflare). Acompanha upgrades sozinho.
app.userAgentFallback = app.userAgentFallback
  .replace(/ Electron\/[\d.]+/, '')
  .replace(/ [\w.-]+\/[\d.]+ (?=Chrome\/)/i, ' ')
  .replace(/(Chrome\/\d+)[\d.]+/, '$1.0.0.0');

// versao do app pro rodape da interface (sync: disponivel no load do preload, que roda
// em sandbox e nao pode ler arquivo local)
ipcMain.on('app:version', (e) => { e.returnValue = app.getVersion(); });
ipcMain.handle('notify', (_e, titulo, corpo) => {
  try { if (Notification.isSupported()) new Notification({ title: titulo, body: corpo }).show(); } catch {}
});

// ===== Extras de sistema =====
// awake: impede o PC de dormir enquanto farma (a tela ainda pode desligar)
let awakeId = null;
ipcMain.handle('awake:set', (_e, on) => {
  if (on && awakeId === null) awakeId = powerSaveBlocker.start('prevent-app-suspension');
  if (!on && awakeId !== null) { powerSaveBlocker.stop(awakeId); awakeId = null; }
  return awakeId !== null;
});

// minToTray: o que o botao minimizar faz (bandeja ou barra). A interface persiste a escolha.
let minToTray = true;
ipcMain.handle('mintray:set', (_e, on) => { minToTray = !!on; return minToTray; });

// ===== Abrir com o Windows =====
// Um atalho na pasta Inicializar do usuario (visivel, apagavel) em vez da chave Run do
// registro — gravar em Run e abrir invisivel sao o que antivirus tratam como persistencia.
const startupDir = () => path.join(app.getPath('appData'), 'Microsoft', 'Windows', 'Start Menu', 'Programs', 'Startup');
const startupLnk = () => path.join(startupDir(), 'IdlePokeGrid.lnk');
const autoStartOn = () => { try { return process.platform === 'win32' && fs.existsSync(startupLnk()); } catch { return false; } };
function setAutoStart(on) {
  if (process.platform !== 'win32') return false;
  try {
    if (on) {
      const opts = { target: process.execPath, description: 'Idle Poke Grid', appUserModelId: 'online.idlepoke.grid' };
      if (!app.isPackaged) opts.args = `"${app.getAppPath()}"`; // rodando pelo codigo: electron + a pasta do app
      shell.writeShortcutLink(startupLnk(), 'create', opts);
    } else {
      try { fs.unlinkSync(startupLnk()); } catch {}
    }
  } catch (e) { registrar('autostart', String((e && e.message) || e)); }
  return autoStartOn();
}
ipcMain.handle('autostart:get', () => ({ on: autoStartOn(), suportado: process.platform === 'win32' }));
ipcMain.handle('autostart:set', (_e, on) => setAutoStart(!!on));

let tray = null; // referencia viva: sem ela o GC derruba a bandeja

// bandeja:atualizar — a interface desenha num canvas (icone + badge de contas fora do
// ar) e manda o PNG pronto + tooltip. Aqui so aplica no icone da bandeja.
ipcMain.handle('bandeja:atualizar', (_e, dataURL, tooltip) => {
  if (!tray || typeof dataURL !== 'string') return false;
  try {
    const img = nativeImage.createFromDataURL(dataURL);
    if (!img.isEmpty()) tray.setImage(img);
    if (typeof tooltip === 'string' && tooltip) tray.setToolTip(tooltip.slice(0, 80));
    return true;
  } catch { return false; }
});

app.whenReady().then(() => {
  // Nada aqui pode derrubar a criacao da janela: se qualquer peca falhar (registro,
  // particao corrompida, bandeja), o app tem que abrir assim mesmo.
  try { app.setAppUserModelId('online.idlepoke.grid'); } catch (e) { registrar('boot', 'appUserModelId: ' + e.message); }

  // Nega pedidos de permissao (mic, camera, localizacao, notificacao...) nas 4 particoes.
  for (let i = 1; i <= 4; i++)
    try { session.fromPartition('persist:conta' + i).setPermissionRequestHandler((_wc, _p, cb) => cb(false)); } catch (e) { registrar('boot', 'sessao conta' + i + ': ' + e.message); }

  const win = new BrowserWindow({
    width: 1600, height: 900, show: false, autoHideMenuBar: true,
    backgroundColor: '#0a0d13',
    icon: path.join(__dirname, 'tray.png'),
    webPreferences: { webviewTag: true, preload: path.join(__dirname, 'preload.js'), backgroundThrottling: false }
  });
  win.loadFile(path.join(__dirname, 'index.html')); // caminho absoluto: robusto dentro do asar

  // a janela principal so mostra index.html: bloqueia navegacao pra fora (canal de exfiltracao)
  win.webContents.on('will-navigate', (e, url) => { if (!url.startsWith('file://')) { e.preventDefault(); abreFora(url); } });
  win.webContents.setWindowOpenHandler(({ url }) => { abreFora(url); return { action: 'deny' }; });
  win.webContents.on('unresponsive', () => registrar('janela', 'interface travou (sem responder)'));
  win.webContents.on('responsive', () => registrar('janela', 'interface voltou a responder'));
  win.webContents.on('render-process-gone', (_e2, d) => { if (d.reason !== 'clean-exit') registrar('janela', 'interface caiu: ' + d.reason); });

  registrar('boot', 'janela criada');
  if (!process.argv.includes('--hidden')) {
    win.once('ready-to-show', () => { registrar('boot', 'conteudo pronto'); win.show(); win.maximize(); });
    // rede de seguranca se o ready-to-show nao vier (Linux costuma ignorar maximize em janela oculta)
    setTimeout(() => { if (!win.isDestroyed() && !win.isVisible()) { registrar('boot', 'rede de seguranca: mostrando a janela'); win.show(); win.maximize(); } }, 8000);
  }

  // Atalhos (funcionam mesmo com o jogo focado): Ctrl+1..4 expande painel, Ctrl+M mudo.
  Menu.setApplicationMenu(Menu.buildFromTemplate([{
    label: 'Atalhos',
    submenu: [
      ...[1, 2, 3, 4].map(n => ({ label: `Expandir painel ${n}`, accelerator: `CmdOrCtrl+${n}`, click: () => win.webContents.send('hotkey', 'expand' + (n - 1)) })),
      { label: 'Mudo', accelerator: 'CmdOrCtrl+M', click: () => win.webContents.send('hotkey', 'mute') }
    ]
  }]));

  // Ao voltar da bandeja, restaura o mesmo estado de antes: hide()+show() no Windows
  // perde o "maximizado", entao rastreamos e reaplicamos.
  let wasMax = true;
  win.on('maximize', () => { wasMax = true; });
  win.on('unmaximize', () => { wasMax = false; });
  const mostrar = () => { const m = wasMax; win.show(); if (m && !win.isMaximized()) win.maximize(); };

  // Bandeja, registro e pasta Inicializar entram DEPOIS que a janela esta na tela. Sao
  // chamadas sincronas ao sistema que antivirus interceptam; se travarem, o processo
  // principal congela e a janela nunca abre. Nada disso pode bloquear a abertura.
  setTimeout(() => {
    try {
      tray = new Tray(path.join(__dirname, 'tray.png'));
      tray.setToolTip('Idle Poke Grid');
      tray.setContextMenu(Menu.buildFromTemplate([
        { label: 'Mostrar', click: mostrar },
        { label: 'Abrir com o Windows', type: 'checkbox', checked: autoStartOn(), visible: process.platform === 'win32',
          click: (item) => { const r = setAutoStart(item.checked); item.checked = r; win.webContents.send('autostart', r); } },
        { label: 'Sair', click: () => app.quit() }
      ]));
      tray.on('click', () => win.isVisible() ? win.hide() : mostrar());
    } catch (e) {
      tray = null;
      registrar('bandeja', 'sem bandeja neste sistema: ' + e.message);
    }
    if (!tray && process.argv.includes('--hidden')) mostrar(); // nao pode nascer invisivel sem bandeja
    registrar('boot', 'bandeja pronta');
  }, 1500);

  win.on('minimize', () => { if (minToTray && tray) win.hide(); });
  app.on('second-instance', () => mostrar());
});

app.on('window-all-closed', () => app.quit());
