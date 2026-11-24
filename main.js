// main.js — PROCESSO PRINCIPAL do FocusEdu
// Responsável por: janela, menu nativo e handlers de IPC.
// Regra: os handlers só recebem e delegam ao repositorio.js.

const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const path = require('node:path');
const repositorio = require('./repositorio.js');

let janela;

function criarJanela() {
  janela = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  janela.loadFile(path.join(__dirname, 'src', 'index.html'));
}

function criarMenu() {
  // TODO: montar o menu nativo com pelo menos um atalho de teclado
  // que execute uma ação do sistema (ex.: Ctrl+N para novo cadastro).
}

app.whenReady().then(() => {
  criarMenu();
  criarJanela();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// ---------------------------------------------------------------
// Handlers de IPC (ipcMain.handle) — canais com prefixo do assunto
// Ex.: 'entidade:carregar', 'entidade:salvar', 'entidade:confirmarExclusao'
// TODO: registrar os handlers e delegar ao repositorio.js
// TODO: usar dialog.showMessageBox para confirmar exclusões
// ---------------------------------------------------------------
