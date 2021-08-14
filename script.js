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
