const userService = require('../services/userService.js')

async function cadastrarUsuario(req, res) {
    const { nome, email, senha, senha_confirmada } = req.body
    try {
        const resposta = await userService.cadastrarUsuario(nome, email, senha, senha_confirmada)
        res.status(201).json(resposta)
    } catch (error) {
        res.status(422).json({ msg: error.message })
    }
}

async function logarUsuario(req, res) {
    const { email, senha } = req.body
    try {
        const resposta = await userService.logarUsuario(email, senha)
        res.status(200).json(resposta)
    } catch (error) {
        res.status(422).json({ msg: error.message })
    }
}

module.exports = {
    cadastrarUsuario,
    logarUsuario
}