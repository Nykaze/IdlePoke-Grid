const { contextBridge, ipcRenderer } = require('electron');

// Ponte entre a interface e o processo principal. Expõe só o que a interface precisa;
// nada do sistema em si fica acessível na página.
contextBridge.exposeInMainWorld('pokeAPI', {
  loadCreds: () => ipcRenderer.invoke('creds:load'),
  saveCreds: (contas) => ipcRenderer.invoke('creds:save', contas),
  setAwake: (on) => ipcRenderer.invoke('awake:set', on),
  setMinToTray: (on) => ipcRenderer.invoke('mintray:set', on),
  getAutoStart: () => ipcRenderer.invoke('autostart:get'),
  setAutoStart: (on) => ipcRenderer.invoke('autostart:set', on),
  onAutoStart: (cb) => ipcRenderer.on('autostart', (_e, on) => cb(on)),
  onHotkey: (cb) => ipcRenderer.on('hotkey', (_e, k) => cb(k)),
  notify: (titulo, corpo) => ipcRenderer.invoke('notify', titulo, corpo),
  logError: (origem, msg) => ipcRenderer.invoke('errlog:write', origem, msg),
  openErrorLog: () => ipcRenderer.invoke('errlog:open'),
  saveBackup: (nome, conteudo, cabecalho) => ipcRenderer.invoke('backup:save', nome, conteudo, cabecalho),
  clearAccount: (i) => ipcRenderer.invoke('conta:limpar', i),
  trayUpdate: (dataURL, tooltip) => ipcRenderer.invoke('bandeja:atualizar', dataURL, tooltip),
  // versao do app: vem do processo principal (o preload roda em sandbox, entao require
  // de arquivo local nao e confiavel)
  appVersion: (() => { try { return ipcRenderer.sendSync('app:version'); } catch { return ''; } })()
});
