<div align="center">

<img src="tray.png" width="72" alt="Idle Poke Grid">

# Idle Poke Grid

**One to four Idle Poke accounts in a single window.**

![Platform](https://img.shields.io/badge/Windows%20%C2%B7%20macOS%20%C2%B7%20Linux-0078D6)
![Electron](https://img.shields.io/badge/Electron-43-47848F)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

[Português](README.md)

</div>

> This is the run-from-source version. There is no ready-made executable to download: you grab the code, look at what it does and run it yourself. That way the trust is on you, not on us.

> ### 🔒 Your login data stays only on your computer
> Login and password are encrypted on your own PC and never leave it. No server, no repository. The whole code is here for you to check.

## What it is

One to four accounts running at once, each in its own panel with a separate session. You save the login once and the app signs in on its own from then on. If a session drops mid farm, it logs back in without you being around. It does not automate the game or touch the captcha, it only organizes the accounts you already have.

## How to run

You need Node.js installed once. After that it is quick.

**1. Install Node.js**
Download the LTS version at [nodejs.org](https://nodejs.org) and install it (just next, next, finish).

**2. Download this code**
Click the green **Code** button above, then **Download ZIP**. Extract the folder wherever you want. If you use Git, clone it.

**3. Install dependencies** (once, inside the folder):

```bash
npm install
```

**4. Open the app**
On Windows, double click the **Abrir Idle Poke Grid** (`.vbs`) file in the folder. The first time it installs what it needs and opens on its own; after that it opens right away, no black window. Want a shortcut? Right click it and pick **Send to: Desktop (create shortcut)**.

You can also use **iniciar.bat**, but it keeps a black window open: close it and the app closes along.

On macOS or Linux, open a terminal in the folder and run:

```bash
bash iniciar.sh
```

That is it. Log in or create an account in each panel and, under "Treinadores" (Accounts), save the login. Next time it signs in on its own.

## Documentation

| | |
|---|---|
| **[Manual](MANUAL.md)** | What every button and panel section does (Portuguese) |
| **[FAQ](FAQ.md)** | Common questions: updating without losing anything, accounts down, themes, captcha |
| **[Tutorial](TUTORIAL.md)** | Step by step for the no-installer version |
| **[Changelog](CHANGELOG.md)** | What landed in each version |

## What it does

- Run 1 to 4 accounts, you choose how many panels to open.
- Auto login, even when the session expires in the middle of a farm.
- **Drag a panel header** to swap panels around; the order is saved.
- **5 accent themes** (violet, blue, green, pink, amber), switchable from the menu.
- **Tray badge** showing how many accounts are down, visible at a glance.
- Eco mode that keeps CPU use down without hurting progress.
- Hides the chat and the game icon menu to free up screen.
- Notifies you when an account drops or runs out of Pokéballs.
- Turn each panel on or off, zoom, expand, rename and keyboard shortcuts.
- Tray, start with Windows, and Portuguese, English or Spanish.

## Security

- Passwords are encrypted by Electron's `safeStorage`, which uses the OS API (DPAPI on Windows). They never leave the PC.
- Panels are locked to the game's domain. An external link opens in your real browser, and the password is only typed into the official login page.
- The UI makes no network calls of its own: the CSP blocks fetch, XHR and websockets outside the panels.
- The game's camera, microphone, location and notifications are blocked.
- You always solve the captcha. The app fills the fields and presses Enter when you tick the box, but it never touches the "Confirm you are human" widget. Beating bot detection is not the point.

## Under the hood

Each panel is an Electron `<webview>` with its own partition (`persist:conta1` to `conta4`), and that is what keeps the accounts isolated and logged in between launches. Whatever the game does not offer, the app injects into each panel: Eco swaps `requestAnimationFrame` for a slower version, and the login fills through the input's native setter. The theme, the panel reordering and the tray badge are plain `index.html` JavaScript with one small channel to the main process. It is all in `main.js`, `preload.js` and `index.html`, nothing hidden.

## Tests

```bash
npm test
```

The boot test loads `main.js` into a fake Electron that refuses a duplicated IPC channel registration — exactly what once killed window creation without leaving a visible error.

## License

MIT. Independent project, not affiliated with the game.
