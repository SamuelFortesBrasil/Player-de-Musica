//Variáveis de Controle
const btPrincipal = document.getElementById('playPause')
const iPrincipal = document.querySelector('#playPause > i')
const nomeMusica = document.getElementById('nomeMusica')
const voltar = document.getElementById('voltar')
const avancar = document.getElementById('avancar')
const audio = document.querySelector('audio')

const barra = document.getElementById('barraProgresso')

//JSON para importação
const resposta = await fetch('dados.json')
const dados = await resposta.json()
//console.log(dados[Math.floor(Math.random()*4)].caminho)


let index = Math.floor(Math.random()*4) 
audio.src = dados[index].caminho
nomeMusica.innerText = dados[index].nome


//Função de Play e Pause
btPrincipal.addEventListener('click',()=>{
    if(iPrincipal.classList.contains('bi-play-fill')){
        iPrincipal.classList.remove('bi-play-fill')
        iPrincipal.classList.add('bi-pause-fill')
        audio.play()
    }else{
        iPrincipal.classList.remove('bi-pause-fill')
        iPrincipal.classList.add('bi-play-fill')
        audio.pause()
    }
})

//Função de Voltar música

voltar.addEventListener('click',()=>{
    if(index === 0){
        audio.src = dados[3].caminho
        audio.play()
        index = 3
    }else{
        audio.src = dados[index - 1].caminho
        index--
        audio.play()
    }
    iPrincipal.classList.remove('bi-play-fill')
    iPrincipal.classList.add('bi-pause-fill')
    nomeMusica.innerText = dados[index].nome
})


//Função de Avançar música
avancar.addEventListener('click',()=>{
    if(index === 3){
        audio.src = dados[0].caminho
        audio.play()
        index = 0
    }else{
        audio.src = dados[index + 1].caminho
        index++
        audio.play()

    }
    iPrincipal.classList.remove('bi-play-fill')
    iPrincipal.classList.add('bi-pause-fill')
    nomeMusica.innerText = dados[index].nome
})


//Aqui os dados do aúdio fazem o atributo max do range tomar forma
audio.addEventListener('loadedmetadata', () => {
    barra.max = audio.duration;
});

//Aqui o timeupdate faz o range acompanhar o tempo da música
audio.addEventListener('timeupdate', () => {
    barra.value = audio.currentTime;
});