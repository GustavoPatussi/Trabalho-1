var listaAlunos = [];

if (localStorage.length == 0){
  localStorage.setItem('alunos', '')
}
listaAlunos = JSON.parse(localStorage.getItem('alunos'));

function salvar() {
  const inputAluno = document.getElementById("nomeAluno");
  const inputCpf = document.getElementById("cpfAluno");
  const inputData = document.getElementById("dataNascimento");

  const aluno = {
    nome: inputAluno.value.trim(),
    cpf: inputCpf.value.trim(),
    dataNascimento: inputData.value
  }

  if ((aluno.nome == "") || (aluno.cpf == "")) {
    alert("Os campos nome do aluno e CPF são obrigatórios.");
    return;
  }

  if ((validarAluno(aluno) == undefined) && (inputAluno.name == "-1")) {
    listaAlunos.push(aluno);
    localStorage.setItem('alunos', JSON.stringify(listaAlunos));
    listarAlunos();
  }
  else {
    if (inputAluno.name != "-1") {
      listaAlunos[inputAluno.name] = aluno;
      localStorage.removeItem('alunos');
      localStorage.setItem('alunos', JSON.stringify(listaAlunos));
      listarAlunos();
    }
    else {
      alert("O aluno já está cadastrado");
    }
  }
  inputAluno.value = "";
  inputAluno.name = "-1";
  inputAluno.focus();
  inputCpf.value = "";
  inputData.value = "";
}

function mostrarLista(){
  if (listaAlunos.length > 0){
      listarAlunos();
  }
}
function ocultarLista(){
  var table = document.getElementById('listaAlunos');
  table.innerHTML = '';
}

function listarAlunos() {
  var tabela = document.getElementById("listaAlunos");
  tabela.innerHTML = "";
  criarCabecalho(tabela);
 
  for (var i = 0; i < listaAlunos.length; i++) {
    const colunaNome = document.createElement("td");
    colunaNome.innerText = listaAlunos[i].nome;
    colunaNome.setAttribute("id", "colunaNome");
   
    const colunaCpf = document.createElement("td");
    colunaCpf.innerText = listaAlunos[i].cpf;
    colunaCpf.setAttribute("id", "colunaCpf");
   
    const colunaData = document.createElement("td");
    colunaData.innerText = listaAlunos[i].dataNascimento;
    colunaData.setAttribute("id", "colunaData");
   
    const colunaAcoes = document.createElement("td");
    colunaAcoes.setAttribute("id", "colunaAcoes");
   
    const botaoAlterar = document.createElement("button");
    botaoAlterar.name = i;
    botaoAlterar.innerText = 'Alterar';
    botaoAlterar.onclick = alterar;
    botaoAlterar.setAttribute("type", "button");
    botaoAlterar.setAttribute("class", "col-lg-5 btn btn-warning btn-sm");
    colunaAcoes.appendChild(botaoAlterar);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.name = i;
    botaoExcluir.innerText = 'Excluir';
    botaoExcluir.onclick = excluir;
    botaoExcluir.setAttribute("type","button");
    botaoExcluir.setAttribute("class", "col-lg-5 btn btn-danger btn-sm");
    colunaAcoes.appendChild(botaoExcluir);
   
    const colunaInformacoes = document.createElement("td");
    colunaInformacoes.setAttribute("id", "colunaInformacoes");
    const divInformacoes = document.createElement("div");
    divInformacoes.setAttribute("class", "col-12 col-mg-6 d-flex flex-column");
    const anchorInformacoes = document.createElement("a");
    anchorInformacoes.setAttribute("href", "card.html");
    anchorInformacoes.setAttribute('class','btn btn-info');
    anchorInformacoes.innerText = "Informações";
    divInformacoes.appendChild(anchorInformacoes);
    colunaInformacoes.appendChild(divInformacoes);
   
    const linha = document.createElement("tr");
    linha.appendChild(colunaNome);
    linha.appendChild(colunaCpf);
    linha.appendChild(colunaData);
    linha.appendChild(colunaAcoes);
    linha.appendChild(colunaInformacoes);
    tabela.appendChild(linha);
  }
}

function validarAluno(aluno) {
  let alunoEncontrado;
  listaAlunos.find(a => {
    if ((a.nome.trim() == aluno.nome.trim()) && (a.cpf == aluno.cpf)){
      alunoEncontrado = a;
      return;
    }
  });
  return alunoEncontrado;
}

function alterar(evento) {
  const indice = evento.target.name;
  const inputAluno = document.getElementById("nomeAluno");
  const inputCpf = document.getElementById("cpfAluno");
  const inputData = document.getElementById("dataNascimento");
  inputAluno.name = indice;
  const aluno = listaAlunos[indice];
  inputAluno.value = aluno.nome;
  inputAluno.focus();
  inputCpf.value = aluno.cpf;
  inputData.value = aluno.dataNascimento;
}

function excluir(evento) {
  const indice = evento.target.name;
  listaAlunos.splice(indice, 1);
  localStorage.removeItem('alunos');
  localStorage.setItem('alunos', JSON.stringify(listaAlunos));
  if (listaAlunos.length > 0) {
    listarAlunos();
  }
  else{
    ocultarLista();
  }
}

function criarCabecalho(tabela){
  const colunaNome = document.createElement("th");
  colunaNome.innerText = "Nome";
  colunaNome.setAttribute("id", "colunaNome")
  const colunaCpf = document.createElement("th");
  colunaCpf.innerText = "CPF";
  colunaCpf.setAttribute("id", "colunaCpf")
  const colunaData = document.createElement("th");
  colunaData.innerText = "Data de nascimento";
  colunaData.setAttribute("id", "colunaData")
  const colunaAcoes = document.createElement("th");
  colunaAcoes.innerText = "Ações";
  colunaAcoes.setAttribute("id", "colunaAcoes");
  const colunaInformacoes = document.createElement("th");
  colunaInformacoes.innerText = "Informações";
  colunaInformacoes.setAttribute("id", "colunaInformacoes");
 
  const linha = document.createElement("tr");
  linha.appendChild(colunaNome);
  linha.appendChild(colunaCpf);
  linha.appendChild(colunaData);
  linha.appendChild(colunaAcoes);
  linha.appendChild(colunaInformacoes);
  tabela.appendChild(linha);
}
