/**
 //* SINCRONO vs ASSINCRONO
 * 
 */

function primeira() {
  console.log('primeira')
}

function segunda() {
  console.log('segunda')
}

setTimeout(primeira, 2000) //? assincrono

segunda()


/**
 * 
 //* AJAX
 * 
 * Asynchronous JavaScript And XML
 * 
 * ROTAS / ENDPOINT
 * 
 *  jsonplaceholder.typicode.com
 * 
 */

const xhttp = new XMLHttpRequest() // método para consultar a rota do API

xhttp.onreadystatechange = function() { // manipular o método
  if (this.readyState == 4 && this.status == 200) { // evitar mensagem de erro inicial, já que ele vai enviar a requisição até ser atendido - readyState = 4 significa que foi finalizada a requisição | status = 200 significa que a requisição foi atendida pelo servidor
    const response = JSON.parse(this.responseText)

    console.log(response[0])
  }
}

xhttp.open('GET', 'https://jsonplaceholder.typicode.com/photos', true) //('medoto', 'url', async/sync) //? assincrono = true
xhttp.send() // enviar a conexao para ser executado


/**
 * 
 * //* CALLBACK
 * 
 */


function exibirNaTela (dados) { //recebe o dados atraves do response do callback
  console.log('exibir na tela', dados)
}


const botaoCarregar = document.querySelector('#botaoCarregar')

botaoCarregar.onclick = () => carregarFotos(exibirNaTela) // a arrowfunction aqui, previne que a função seja executada sem o click



function carregarFotos (callback) { // callback pode ser qualquer nome
  const xhttp = new XMLHttpRequest()

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      const response = JSON.parse(this.responseText)

      if (callback) { // previnir que caso o botão não tenha um callback não execute erro
        callback(response) // envia a resposta para o exibirNaTela
      }
    }
  }

  xhttp.open('GET', 'https://jsonplaceholder.typicode.com/photos', true)
  xhttp.send() 

}


/**
 * 
 * 
 * //* PROMISES
 * 
 * 
 */

 function exibirNaTela2 (dados) { 
  console.log('exibir na tela - promise', dados)
}

function exibirErro () {
  console.log('ops, deu erro!')
}


const botaoCarregar2 = document.querySelector('#botaoCarregar2')

botaoCarregar2.onclick = () => 
  buscar('https://jsonplaceholder.typicode.com/photos', 'GET') // função genérica, estou atribuindo o url da função buscar
    .then(exibirNaTela2) //then relaciona-se com o resolve
    .catch(exibirErro) //catch relaciona-se com reject




function buscar(url, method) { // atribuir url e metodo, função genérica. Está buscando a atribuição no botaoCarregar2
  return new Promise((resolve, reject) => {

    const xhttp = new XMLHttpRequest()

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const response = JSON.parse(this.responseText)

        resolve(response)
      }

      if (this.status === 404) {
        reject()
      }
    }
  
    xhttp.open(method, url, true) //url da função buscar que é indicado pelo botão botaoCarregar2 buscar(url), assim coomo o method está fazendo o mesmo e trazendo GET
    xhttp.send() 
  

  })

 
}



/**
 * 
 * 
 * //* FETCH - API
 * 
 * 
 */

function transformarEmJson(response) { //response pode ser qualquer nome
  return response.json() //retorna para o proximo then, que no caso é exibirNaTela3
}

 function exibirNaTela3 (dados) { 
  console.log('exibir na tela - fetch', dados)
}

function exibirErro3 () {
  console.log('ops, deu erro!')
}


const botaoCarregar3 = document.querySelector('#botaoCarregar3')

const configs = {
  method: 'GET',
  headers: {}
}

botaoCarregar3.onclick = () => 
  fetch('https://jsonplaceholder.typicode.com/photos', configs) // fetch recebe ('url', {objeto/metodo})
    .then(transformarEmJson) // posso ter diversos then, mas o de cima sempre tem que ter um return para o de baixo
    .then(exibirNaTela3)
    .catch(exibirErro3) // só posso ter um catch


/**
 * 
 * //* ASYNC / AWAIT
 * 
 * 
 */

 function transformarEmJson2(response) { 
  return response.json()
}

 function exibirNaTela4 (dados) { 
  console.log('exibir na tela - async/await', dados)
}

function exibirErro4 () {
  console.log('ops, deu erro!')
}


const botaoCarregar4 = document.querySelector('#botaoCarregar4')

botaoCarregar4.onclick = aoClicarNoBotao

async function aoClicarNoBotao() { //async avisa que é assincrona
  const dados = await fetch('https://jsonplaceholder.typicode.com/photos') // await para esperar a resposta antes de seguir
    .then(transformarEmJson2) 
    .catch(exibirErro4) 

  console.log(dados)
}


/**
 * 
 * 
 * //* DESESTRUCTURING ASSIGNMENT
 * 
 *  Desestruturação de Atribuição
 * 
 */


// exemplo

const obj = {
  nome: 'Patrick',
  idade: 35,
  genero: 'masculino'
}

//* jeito manual inviável
// const nome = obj.nome
// const idade = obj.idade
// const genero = obj.genero

//* novo jeito
const {
  nome,
  idade,
  genero,
} = obj

console.log(nome)

//* podendo também atribuir um novo nome para as variáveis, ex
// const {
//   nome: nomeUsuario,
//   idade,
//   genero,
// } = obj

// console.log(nomeUsuario)






 function transformarEmJson3(response) { 
  return response.json()
}

 function exibirNaTela5 (dados) { 
  console.log('exibir na tela - async/await', dados)
}

function exibirErro5 () {
  console.log('ops, deu erro!')
}


const botaoCarregar5 = document.querySelector('#botaoCarregar5')

botaoCarregar5.onclick = aoClicarNoBotao2

async function aoClicarNoBotao2() { //async avisa que é assincrona
  const dados = await fetch('https://jsonplaceholder.typicode.com/users/1') // await para esperar a resposta antes de seguir
    .then(transformarEmJson3) 
    .catch(exibirErro5) 

  //*Maneira verbosa  
  // const nome = dados.name
  // const email = dados.email
  // const phone = dados.phone

  //*Desestructuring Assignment
  const { name, email, phone } = dados

  console.log(name, email, phone)
}