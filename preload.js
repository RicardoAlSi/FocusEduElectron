// preload.js — ponte segura entre a tela e o processo principal.
// Expõe SOMENTE as funções necessárias em window.api via contextBridge.

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  carregar: () => ipcRenderer.invoke('atividade:carregar'),
  salvar: (registros) => ipcRenderer.invoke('atividade:salvar', registros),
  confirmarExclusao: (titulo) => ipcRenderer.invoke('atividade:confirmarExclusao', titulo),
  aoNovaAtividade: (callback) => ipcRenderer.on('menu:novaAtividade', () => callback()),
});