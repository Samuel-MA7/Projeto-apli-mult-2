//evento de login
document.getElementById('entrarForm').addEventListener('submit',async(e)=>{
    e.preventDefault()

    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value
    //método para enviar o dados à rota de login
    const resposta = await fetch('/auth/entrar',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({ email, senha })
    })
    //pega o json de resultado da rota e envia a mensagem de sucesso ou fracasso no DOM 
    const resultado = await resposta.json()
    document.getElementById('msg').textContent = resultado.msg
    //armazena no local storage do cliente o token jwt
    if(resposta.ok){
        localStorage.setItem('token',resultado.token)
        //leva até a página de perfil
        window.location.href = './usuario/profile.html'
    }
})