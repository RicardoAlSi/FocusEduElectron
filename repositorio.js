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
    try {
        const texto = await fs.readFile(caminhoDoArquivo(), 'utf-8');
        return JSON.parse(texto);
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            return [];
        }
        throw erro;
    }
}

async function salvar(registros) {
    const texto = JSON.stringify(registros, null, 2);
    await fs.writeFile(caminhoDoArquivo(), texto, 'utf-8');
}

module.exports = {
  caminhoDoArquivo,
  carregar,
  salvar,
};
