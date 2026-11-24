// renderer.js — a tela do FocusEdu.
// Regra: NÃO usar require, fs nem nada do Node aqui.
// Tudo que é do sistema operacional é pedido via window.api.

let registros = [];

async function iniciar() {
  // TODO: carregar os registros via window.api antes de desenhar a lista
  renderizar();
}

function renderizar() {
  // TODO: desenhar a listagem
}

// TODO: cadastrar, editar e excluir (com confirmação nativa via window.api)

iniciar();
