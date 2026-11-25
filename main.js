// main.js — PROCESSO PRINCIPAL do FocusEdu
// Responsável por: janela, menu nativo e handlers de IPC.
// Regra: os handlers só recebem e delegam ao repositorio.js.

const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const path = require('node:path');
const repositorio = require('./repositorio.js');

let janela;

function criarJanela() {
  janela = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  janela.loadFile(path.join(__dirname, 'src', 'index.html'));
}

function criarMenu() {
  const modelo = [
    {
      label: 'Arquivo',
      submenu: [
        {
          label: 'Nova Atividade',
          accelerator: 'CmdOrCtrl+N',
          click: () => janela.webContents.send('menu:novaAtividade'),
        },
        { type: 'separator' },
        { label: 'Sair', role: 'quit' },
      ],
    },
    { label: 'Editar', role: 'editMenu' },
    {
      label: 'Exibir',
      submenu: [{ role: 'reload' }, { role: 'toggleDevTools' }],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(modelo));
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

ipcMain.handle('atividade:carregar', () => repositorio.carregar());

ipcMain.handle('atividade:salvar', (evento, registros) => repositorio.salvar(registros));

ipcMain.handle('atividade:confirmarExclusao', async (evento, titulo) => {
  const { response } = await dialog.showMessageBox(janela, {
    type: 'warning',
    buttons: ['Cancelar', 'Excluir'],
    defaultId: 0,
    cancelId: 0,
    title: 'Confirmar exclusão',
    message: `Deseja excluir a atividade "${titulo}"?`,
  });
  return response === 1;
});
