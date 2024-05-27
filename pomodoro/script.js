let acao = document.getElementById('acao')
let pausa = document.getElementById('pausa')
let sessoes = document.getElementById('sessoes')
let seconds

var audioBell = new Audio('./audio/bell.mp3')
var audioVolta = new Audio('./audio/volta.mp3')
var audioFinal = new Audio('./audio/final.mp3')

var lofi = document.getElementById('lofi')
var pause = document.getElementById('pause')
var play = document.getElementById('play')

function pausar(){
    lofi.pause()
    play.style.setProperty('display','block','important')
    pause.style.setProperty('display','none','important')
}

function tocar(){
    lofi.play()
    play.style.setProperty('display','none','important')
    pause.style.setProperty('display','block','important')
}

function start(){
    if(acao.value == 0){
        document.getElementById('error-acao').innerHTML='Declare os minutos!'
        acao.focus()
    }else if(pausa.value == 0){
        document.getElementById('error-pausa').innerHTML='Declare os minutos!'
        pausa.focus()
    }else if(sessoes.value == 0){
        document.getElementById('error-sessoes').innerHTML='Declare as sessões!'
        sessoes.focus()
    }else{
        lofi.play()
        pause.style.setProperty('display','block','important')
        localStorage.setItem('acao',String(acao.value))
        localStorage.setItem('pausa',String(pausa.value))
        localStorage.setItem('sessoes',String(sessoes.value))

        document.getElementById('config').style.setProperty('display','none','important')
        document.getElementById('timer').style.setProperty('display','block','important')

        timeAction()
    }
}

function timeAction(){
    let value_sessoes = localStorage.getItem('sessoes')
    if(value_sessoes != '1'){
        document.getElementById('title_section').innerHTML=value_sessoes+' sessões restantes.'
    }else{
        document.getElementById('title_section').innerHTML=value_sessoes+' sessão restante.'
    }
    
    let title = document.getElementById('title')
    title.innerHTML = 'AÇÃO'
    title.style.fontSize = '25pt'
    title.style.fontWeight = 'bold'
    title.style.setProperty('color','#5CEDAF','important')

    minutes = Number(localStorage.getItem('acao'))
    minutes -= 1
    seconds = 59
    document.getElementById('minutes_ok').innerHTML=minutes
    document.getElementById('seconds_ok').innerHTML=seconds
    var interval_minutes = setInterval(minuteTimer,60000)
    var interval_seconds = setInterval(secondTimer,1000)
    function minuteTimer(){
        minutes -= 1
        document.getElementById('minutes_ok').innerHTML=minutes
    }
    function secondTimer(){
        seconds -= 1
        document.getElementById('seconds_ok').innerHTML=seconds
        if(seconds <= 0){
            if(minutes <= 0){
                clearInterval(interval_minutes)
                clearInterval(interval_seconds)
                audioBell.play()
                timePause()
            }
            seconds = 60
        }
    }
}

function timePause(){
    let title = document.getElementById('title')
    title.innerHTML = 'PAUSA'
    title.style.fontSize = '25pt'
    title.style.fontWeight = 'bold'
    title.style.setProperty('color','#5CEDAF','important')

    minutes = Number(localStorage.getItem('pausa'))
    minutes -= 1
    seconds = 59
    document.getElementById('minutes_ok').innerHTML=minutes
    document.getElementById('seconds_ok').innerHTML=seconds
    var interval_minutes = setInterval(minuteTimer,60000)
    var interval_seconds = setInterval(secondTimer,1000)
    function minuteTimer(){
        minutes -= 1
        document.getElementById('minutes_ok').innerHTML=minutes
    }
    function secondTimer(){
        seconds -= 1
        document.getElementById('seconds_ok').innerHTML=seconds
        if(seconds <= 0){
            if(minutes <= 0){
                sessao = Number(localStorage.getItem('sessoes'))
                sessao -= 1
                localStorage.setItem('sessoes',String(sessao))
                clearInterval(interval_minutes)
                clearInterval(interval_seconds)
                if(sessao <= 0){
                    audioFinal.play()
                    localStorage.clear()
                    document.getElementById('config').style.setProperty('display','none','important')
                    document.getElementById('timer').style.setProperty('display','none','important')
                    document.getElementById('fim').style.setProperty('display','block','important')
                }else{
                    audioVolta.play()
                    timeAction()
                }
            }
            seconds = 60
        }
    }
}