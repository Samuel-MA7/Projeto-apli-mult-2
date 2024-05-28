document.getElementById('formCadastrar').addEventListener('submit',async(e)=>{
    e.preventDefault()

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const senha_confirmada = document.getElementById('senha_confirmada').value

    const resposta = await fetch('/auth/cadastrar',{
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify({ nome, email, senha, senha_confirmada })
    });

    const resultado = await resposta.json()
    document.getElementById('msg').textContent = resultado.msg
});
