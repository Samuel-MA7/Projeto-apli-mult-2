const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function cadastrarUsuario(req, res) {
    const { nome, email, senha } = req.body;

    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
        return res.status(422).json({ msg: 'O email fornecido já está cadastrado!' });
    }

    const salt = await bcrypt.genSalt(12);
    const senhaHash = await bcrypt.hash(senha, salt);

    const novoUsuario = new User({ nome, email, senha: senhaHash });

    try {
        await novoUsuario.save();
        res.status(201).json({ msg: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ msg: 'Ocorreu um erro no servidor!' });
    }
}

async function logarUsuario(req, res) {
    const { email, senha } = req.body;

    const usuario = await User.findOne({ email });
    if (!usuario) {
        return res.status(404).json({ msg: 'Não há usuário cadastrado com esse email!' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
        return res.status(422).json({ msg: 'Senha inválida!' });
    }

    const token = jwt.sign({ id: usuario._id }, process.env.SECRET);
    res.status(200).json({ msg: 'Login realizado com sucesso!', token });
}

async function obterPerfil(req, res) {
    try {
        const usuario = await User.findById(req.userId).select('-senha');
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(401).json({ msg: 'Token inválido' });
    }
}

module.exports = {
    cadastrarUsuario,
    logarUsuario,
    obterPerfil
};