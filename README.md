# FocusEdu

Sistema desenvolvido na N1 (JavaFX) reconstruído em **Electron** com HTML, CSS e JavaScript puro (sem React/Vue) — Avaliação Prática N2 de Programação Desktop.

> Este repositório contém o **esqueleto** do projeto: estrutura de pastas e arquivos com `TODO`s indicando o que cada parte deve implementar.

## Como rodar

```bash
npm install
npm start
```

## Estrutura

```
focusEdu/
├── package.json
├── main.js          # processo principal: janela, menu e handlers de IPC
├── preload.js       # expõe window.api com contextBridge
├── repositorio.js   # leitura e gravação do arquivo JSON (fs/promises)
├── README.md
└── src/
    ├── index.html   # tela: formulário (cadastrar/editar) + listagem
    ├── style.css
    └── renderer.js  # lógica da tela (sem Node, só window.api)
```

## Requisitos

- **Operações:** cadastrar, listar, editar e excluir (com confirmação em diálogo nativo).
- **Persistência:** arquivo JSON em `app.getPath('userData')`; carregado ao abrir o app, gravado a cada mudança; na primeira execução abre com a lista vazia e sem erro.
- **Recursos:** `contextBridge` no preload; `ipcMain.handle` + `ipcRenderer.invoke`; `dialog.showMessageBox` na exclusão; menu nativo com atalho de teclado (ex.: `Ctrl+N`); `fs/promises`, `JSON.stringify` e `JSON.parse` no repositório.

## Regras de organização

- `renderer.js` não usa `require`, `fs` nem nada do Node.
- Handlers do `main.js` só recebem e delegam; arquivo é responsabilidade do `repositorio.js`.
- Canais IPC com prefixo do assunto (ex.: `entidade:carregar`, `entidade:salvar`).
