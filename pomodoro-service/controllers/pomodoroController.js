const Pomodoro = require('../models/Pomodoro');

async function criarPomodoro(req, res) {
    const { nome, tempoEsforco, tempoDescanso } = req.body;
    const novoPomodoro = new Pomodoro({ userId: req.userId, nome, tempoEsforco, tempoDescanso });

    try {
        await novoPomodoro.save();
        res.status(201).json({ msg: 'Pomodoro criado com sucesso!' });
    } catch (error) {
        res.status(500).json({ msg: 'Ocorreu um erro no servidor!' });
    }
}

async function obterPomodoros(req, res) {
    try {
        const pomodoros = await Pomodoro.find({ userId: req.userId });
        res.status(200).json(pomodoros);
    } catch (error) {
        res.status(500).json({ msg: 'Ocorreu um erro no servidor!' });
    }
}

module.exports = {
    criarPomodoro,
    obterPomodoros
}