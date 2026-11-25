let registros = [];
let selecionadoId = null;
let editandoId = null;

const lista = document.getElementById('lista');
const formulario = document.getElementById('formulario');
const tituloFormulario = document.getElementById('titulo-formulario');
const campoTitulo = document.getElementById('campo-titulo');
const campoDisciplina = document.getElementById('campo-disciplina');
const campoPrazo = document.getElementById('campo-prazo');
const campoDescricao = document.getElementById('campo-descricao');

function classeDisciplina(disciplina) {
  const classes = {
    'Matemática': 'disciplina-matematica',
    'L. Portuguesa': 'disciplina-portuguesa',
    'História': 'disciplina-historia',
    'Ciências': 'disciplina-ciencias',
    'Inglês': 'disciplina-ingles',
  };
  return classes[disciplina] || 'disciplina-outra';
}

function textoPrazo(prazo) {
  if (!prazo) return { texto: 'Prazo: ', hoje: false };
  const [ano, mes, dia] = prazo.split('-');
  const agora = new Date();
  const hoje = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, '0')}-${String(agora.getDate()).padStart(2, '0')}`;
  if (prazo === hoje) return { texto: 'Prazo: Hoje', hoje: true };
  return { texto: `Prazo: ${dia}/${mes}/${ano}`, hoje: false };
}

async function iniciar() {
  registros = await window.api.carregar();
  renderizar();
  window.api.aoNovaAtividade(() => abrirFormulario());
}

function renderizar() {
  lista.innerHTML = '';

  if (registros.length === 0) {
    const vazio = document.createElement('li');
    vazio.className = 'vazio';
    vazio.textContent = 'Nenhuma atividade cadastrada.';
    lista.appendChild(vazio);
    return;
  }

  registros.forEach((r) => {
    const item = document.createElement('li');
    item.className = 'item';
    if (r.id === selecionadoId) item.classList.add('selecionado');
    if (r.concluida) item.classList.add('concluida');

    const linhaChips = document.createElement('div');
    linhaChips.className = 'linha-chips';

    const chipDisciplina = document.createElement('span');
    chipDisciplina.className = `chip-disciplina ${classeDisciplina(r.disciplina)}`;
    chipDisciplina.textContent = r.disciplina || 'Outra';

    const chipStatus = document.createElement('span');
    chipStatus.className = 'chip-status';
    chipStatus.textContent = r.concluida ? 'Concluída' : 'Pendente';

    linhaChips.append(chipDisciplina, chipStatus);

    const titulo = document.createElement('div');
    titulo.className = 'card-titulo';
    titulo.textContent = r.titulo;

    const descricao = document.createElement('div');
    descricao.className = 'card-descricao';
    descricao.textContent = r.descricao || '';

    const prazo = document.createElement('div');
    const infoPrazo = textoPrazo(r.prazo);
    prazo.className = infoPrazo.hoje ? 'card-prazo prazo-hoje' : 'card-prazo';
    prazo.textContent = infoPrazo.texto;

    item.append(linhaChips, titulo, descricao, prazo);

    item.addEventListener('click', () => {
      selecionadoId = r.id;
      renderizar();
    });

    lista.appendChild(item);
  });
}

function abrirFormulario(registro) {
  editandoId = registro ? registro.id : null;
  tituloFormulario.textContent = registro ? 'Editar Atividade' : 'Nova Atividade';
  campoTitulo.value = registro ? registro.titulo : '';
  campoDisciplina.value = registro ? registro.disciplina : '';
  campoPrazo.value = registro ? registro.prazo : '';
  campoDescricao.value = registro ? (registro.descricao || '') : '';
  formulario.hidden = false;
  campoTitulo.focus();
}

function fecharFormulario() {
  formulario.hidden = true;
  editandoId = null;
  formulario.reset();
}

function obterSelecionado() {
  const registro = registros.find((r) => r.id === selecionadoId);
  if (!registro) alert('Selecione uma atividade na lista primeiro.');
  return registro;
}

async function gravar() {
  await window.api.salvar(registros);
  renderizar();
}

document.getElementById('btn-adicionar').addEventListener('click', () => abrirFormulario());

document.getElementById('btn-editar').addEventListener('click', () => {
  const registro = obterSelecionado();
  if (registro) abrirFormulario(registro);
});

document.getElementById('btn-concluir').addEventListener('click', async () => {
  const registro = obterSelecionado();
  if (!registro) return;
  registro.concluida = !registro.concluida;
  await gravar();
});

document.getElementById('btn-excluir').addEventListener('click', async () => {
  const registro = obterSelecionado();
  if (!registro) return;
  const confirmou = await window.api.confirmarExclusao(registro.titulo);
  if (!confirmou) return;
  registros = registros.filter((r) => r.id !== registro.id);
  selecionadoId = null;
  await gravar();
});

document.getElementById('btn-cancelar').addEventListener('click', fecharFormulario);

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();

  const dados = {
    titulo: campoTitulo.value.trim(),
    disciplina: campoDisciplina.value.trim(),
    descricao: campoDescricao.value.trim(),
    prazo: campoPrazo.value,
  };

  if (editandoId) {
    const registro = registros.find((r) => r.id === editandoId);
    Object.assign(registro, dados);
  } else {
    registros.push({ id: Date.now(), concluida: false, ...dados });
  }

  fecharFormulario();
  await gravar();
});

iniciar();