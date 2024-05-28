const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

async function cadastrarUsuario(nome, email, senha, senha_confirmada){
    if(!nome || !email || !senha || !senha_confirmada){
        throw new Error('Há campos que ainda precisam ser preenchidos!')
    }else if(senha_confirmada !== senha){
        throw new Error('Os campos de senhas não estão correspondendo!')
    }
    //checar se já existe usuário com o e-mail fornecido
    const usuarioExistente = await User.findOne({ email:email })
    if(usuarioExistente){
        throw new Error('O email fornecido já está cadastrado!')
    }
    //criar a senha criptografada
    const salt = await bcrypt.genSalt(12)
    const senhaHash = await bcrypt.hash(senha,salt)
    //criar o usuário
    const usuario = new User({
        nome,
        email,
        senha: senhaHash
    })
    try {
        await usuario.save()
        return { msg: 'Usuário cadastrado com sucesso!' }
    } catch (error) {
        console.log(error)
        return { msg: 'Ocorreu um erro no servidor!' }
    }
}

async function logarUsuario(email, senha){
    if(!email || !senha){
        throw new Error('Preencha todos os campos!')
    }
    //checar se o usuário existe
    const usuario = await User.findOne({ email:email })
    if(!usuario){
        throw new Error('Não há usuário cadastrado com esse email!')
    }
    //comparar a senha fornecida com a do banco de dados
    const senha_comparada = await bcrypt.compare(senha,usuario.senha)
    if(!senha_comparada){
        throw new Error('Senha inválida!');
    }
    try {
        const token = jwt.sign(
            {
                id:usuario._id
            },
            process.env.SECRET,
            {
                expiresIn:'1h'
            }
        )
        return { msg: 'Login realizado com sucesso!', token }
    } catch (error) {
        console.log(error)
        return { msg: 'Ocorreu um erro no servidor!' }
    }
}

module.exports={
    cadastrarUsuario,
    logarUsuario
}