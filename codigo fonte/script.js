
var altura = 500
var largura = 500
var vidas = 1
var tempo = 15

//seta o nivel de dificuldade
var cria_mosquito_tempo = 2000
var nivel = window.location.search
nivel = nivel.replace('?','')

if(nivel === 'normal'){
	cria_mosquito_tempo = 2000
}else if(nivel === 'dificil'){
	cria_mosquito_tempo = 900
}


//verifica o tamanho maximo que a tela pode ser usada
function ajustaTamanhoPalcoJogo() {
	altura = window.innerHeight
	largura = window.innerWidth

	console.log(largura, altura)
}
ajustaTamanhoPalcoJogo()


//seta o cronometro no jogo
var cronometro = setInterval(function(){
	tempo -=1
	if(tempo < 0){
		clearInterval(cronometro)
		clearInterval(mudaposicao)
		window.location.href = 'vitoria.html'
	}else{
		document.querySelector('#cronometro').innerHTML = tempo
	}

},1000)

//deixa a posicao aleatoria dentro da janela
function posicaoRandomica() {


	//remover o mosquito anterior (caso exista)
	if(document.getElementById('mosquito')) {
		document.getElementById('mosquito').remove()

        //tira o coracao quando a mosca some
        if(vidas > 3){
            window.location.href = 'game_over.html'
        }else{
            document.querySelector('#v' + vidas).src= '/img_jogo_mosquito/coracao_vazio.png'
            vidas++
        }

	}

	var posicaoX = Math.floor(Math.random() * largura) - 90
	var posicaoY = Math.floor(Math.random() * altura) - 90

	posicaoX = posicaoX < 0 ? 0 : posicaoX
	posicaoY = posicaoY < 0 ? 0 : posicaoY

	console.log(posicaoX, posicaoY)

	//criar o elemento html
	var mosquito = document.createElement('img')
	mosquito.src = '/img_jogo_mosquito/mosca.png'
	mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
	mosquito.style.left = posicaoX + 'px'
	mosquito.style.top = posicaoY + 'px'
	mosquito.id = 'mosquito'
    //se nao clicar na mosca a tempo um coração some
    mosquito.onclick = function(){
        this.remove()
    }

	document.body.appendChild(mosquito)

}
posicaoRandomica()

//faz que suma a cada intervalo de tempo
var mudaposicao = setInterval(function(){posicaoRandomica()}, cria_mosquito_tempo)

//faz que o tamanho da mosca fique maior ou menor
function tamanhoAleatorio() {
	var classe = Math.floor(Math.random() * 3)
	
	switch(classe) {
		case 0:
			return 'mosquito1'
		
		case 1:
			return 'mosquito2'

		case 2:
			return 'mosquito3'
	}
}

//faz com que a imagem fique para esquerda ou para a direita
function ladoAleatorio() {
	var classe = Math.floor(Math.random() * 2)
	
	switch(classe) {
		case 0:
			return 'ladoA'
		
		case 1:
			return 'ladoB'

	}
}