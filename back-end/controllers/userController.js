const userService = require('../services/userService.js')

async function cadastrarUsuario(req, res){
    const { nome, email, senha, senha_confirmada } = req.body
    try {
        const resposta = await userService.cadastrarUsuario(nome, email, senha, senha_confirmada)
        res.status(201).json(resposta)
    } catch (error) {
        res.status(422).json({ msg: error.message })
    }
}

async function logarUsuario(req, res){
    const { email, senha } = req.body
    try {
        const resposta = await userService.logarUsuario(email, senha)
        res.status(200).json(resposta)
    } catch (error) {
        res.status(422).json({ msg: error.message })
    }
}

async function perfilUsuario(req,res){
    try{
        const userId = req.userId
        const usuario = await userService.perfilUsuario(userId)
        if (!usuario){
            return res.status(404).json({ msg: 'Usuário não encontrado' })
        }
        res.status(200).json(usuario)
    }catch(error){
        res.status(500).json({ msg: 'Erro interno do servidor' })
    }
}

module.exports = {
    cadastrarUsuario,
    logarUsuario,
    perfilUsuario
}