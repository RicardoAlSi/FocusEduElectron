// preload.js — ponte segura entre a tela e o processo principal.
// Expõe SOMENTE as funções necessárias em window.api via contextBridge.

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // TODO: expor as funções usando ipcRenderer.invoke
  // Ex.: carregar: () => ipcRenderer.invoke('entidade:carregar'),
});
