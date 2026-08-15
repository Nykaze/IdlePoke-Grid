<div align="center">

<img src="tray.png" width="72" alt="Idle Poke Grid">

# Idle Poke Grid

**De uma a quatro contas do Idle Poke em uma janela só.**

![Plataforma](https://img.shields.io/badge/Windows%20%C2%B7%20macOS%20%C2%B7%20Linux-0078D6)
![Electron](https://img.shields.io/badge/Electron-43-47848F)
[![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-blue)](LICENSE)

[English](README.en.md)

</div>

> Esta é a versão que roda a partir do código. Não tem executável pronto pra baixar: você pega o código, olha o que ele faz e roda você mesmo. Assim a confiança fica com você, não com a gente.

> 🔰 **Nunca mexeu com isso?** Tem um passo a passo pra leigo aqui: **[TUTORIAL.md](TUTORIAL.md)** (ou o arquivo `COMO USAR.txt` dentro da pasta).

> ### 🔒 Seus dados de login ficam só no seu computador
> Login e senha são criptografados no seu próprio PC e nunca saem dele. Nada de servidor, nada de repositório. O código está todo aqui pra você conferir.

## O que é

De uma a quatro contas rodando ao mesmo tempo, cada uma no seu painel e com sessão separada. Você salva o login uma vez e o app entra sozinho nas próximas. Se a sessão cair no meio do farm, ele loga de novo sem você precisar estar por perto. Ele não automatiza o jogo nem toca no captcha, só organiza as contas que você já tem.

## Como rodar

Você precisa do Node.js instalado uma vez. Depois é rápido.

**1. Instale o Node.js**
Baixe a versão LTS em [nodejs.org](https://nodejs.org) e instale (é next, next, finish).

**2. Baixe este código**
Clique no botão verde **Code** aqui em cima e depois em **Download ZIP**. Extraia a pasta onde quiser. Quem usa Git pode clonar.

**3. Instale as dependências** (uma vez, dentro da pasta):

```bash
npm install
```

**4. Abra o app**
No Windows, dê dois cliques no arquivo **Abrir Idle Poke Grid** (`.vbs`) dentro da pasta. Na primeira vez ele instala o necessário e abre sozinho; nas próximas abre na hora, sem janela preta. Quer um atalho? Botão direito nele, **Enviar para: Área de trabalho (criar atalho)**.

Também dá pra usar o **iniciar.bat**, mas ele mantém uma janela preta aberta e, se ela for fechada, o app fecha junto.

No macOS ou Linux, abra o terminal na pasta e rode:

```bash
bash iniciar.sh
```

Pronto. Entre ou crie uma conta em cada painel e, em "Treinadores", salve o login. Da próxima vez ele entra sozinho.

## Documentação

| | |
|---|---|
| **[Manual](MANUAL.md)** | O que cada botão e cada seção faz, em linguagem simples |
| **[FAQ](FAQ.md)** | Dúvidas frequentes: atualizar sem perder nada, conta fora do ar, temas, captcha |
| **[Tutorial](TUTORIAL.md)** | Passo a passo pra rodar a versão sem instalador |
| **[Mudanças](CHANGELOG.md)** | O que entrou em cada versão |

## O que ele faz

- Rode de 1 a 4 contas, você escolhe quantos painéis abrir.
- Login automático, mesmo quando a sessão expira no meio do farm.
- **Arraste o cabeçalho de um painel** pra trocar os painéis de lugar; a ordem fica salva.
- **5 temas de cor** (violeta, azul, verde, rosa, âmbar), trocáveis no menu.
- **Distintivo na bandeja** com o número de contas fora do ar, pra ver de relance sem abrir a janela.
- Modo Eco que segura o uso de CPU sem atrapalhar o progresso.
- **Esconde elementos do jogo** (chat, janelas, menu de ícones, combat) com caixas no menu, valendo para todas as contas.
- **Pílula de hunt** por cima de cada painel com o que a conta está farmando e há quanto tempo.
- Avisa por notificação quando uma conta cai.
- Liga e desliga cada painel, zoom, expandir, renomear e atalhos de teclado.
- Bandeja, iniciar junto com o Windows e idioma português, inglês ou espanhol.

## Segurança

- As senhas são criptografadas pelo `safeStorage` do Electron, que usa a API do sistema (DPAPI no Windows). Nunca saem do PC.
- Os painéis ficam presos ao domínio do jogo. Link externo abre no seu navegador, e a senha só é digitada na tela de login oficial.
- A interface não faz rede própria: a CSP bloqueia fetch, XHR e websocket fora dos painéis.
- Câmera, microfone, localização e notificações do jogo ficam bloqueados.
- O captcha é sempre você que resolve. O app preenche e aperta Entrar quando você marca a caixinha, mas nunca toca no "Confirme que é humano". Burlar detecção de bot não é a proposta.

## Por dentro

Cada painel é um `<webview>` do Electron com partição própria (`persist:conta1` até `conta4`), e é isso que mantém as contas isoladas e logadas entre aberturas. O que o jogo não oferece, o app injeta em cada painel: o Eco troca o `requestAnimationFrame` por uma versão mais lenta e o login preenche pelo setter nativo do input. O tema, a reordenação e o distintivo da bandeja são só JavaScript do `index.html` com um canal pequeno pro processo principal. Está tudo em `main.js`, `preload.js` e `index.html`, sem nada escondido.

## Testes

```bash
npm test
```

O teste de inicialização carrega o `main.js` num simulador de Electron que recusa canal de IPC registrado duas vezes — exatamente o que um dia derrubou a abertura da janela sem deixar erro visível.

## Licença

MIT. Projeto independente, sem ligação com o jogo.
