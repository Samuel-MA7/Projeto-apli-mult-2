//evento de permanência ou recusa do usuário na página de perfil
document.addEventListener('DOMContentLoaded',async()=>{
    const token = localStorage.getItem('token')
    if(!token){
         //levar para a página inicial se não houver token
        window.location.href = '/'
    }

    const resposta = await fetch('/profile',{
        method:'GET',
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })

    const resultado = await resposta.json()
    if(resposta.ok){
        document.getElementById('nome').textContent += resultado.nome
    }else{
        //levar para a página inicial se o token for inválido
        window.location.href = '/'
    }
})
//evento de logout
document.getElementById('sair').addEventListener('click',()=>{
    //remove o token jwt do local storage do cliente e manda para a página inicial
    localStorage.removeItem('token')
    window.location.href = '/'
})