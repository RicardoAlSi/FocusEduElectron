// repositorio.js — todo o código de ler e gravar o arquivo JSON.
// Usa fs/promises, JSON.stringify e JSON.parse.
// O arquivo fica em app.getPath('userData').

const fs = require('node:fs/promises');
const path = require('node:path');
const { app } = require('electron');

const NOME_ARQUIVO = 'focusedu.json';

function caminhoDoArquivo() {
  return path.join(app.getPath('userData'), NOME_ARQUIVO);
}

async function carregar() {
  // TODO: ler o arquivo e retornar os registros.
  // Na primeira execução (arquivo inexistente, erro ENOENT) retornar [].
}

async function salvar(registros) {
  // TODO: gravar os registros no arquivo JSON.
}

module.exports = {
  caminhoDoArquivo,
  carregar,
  salvar,
};
