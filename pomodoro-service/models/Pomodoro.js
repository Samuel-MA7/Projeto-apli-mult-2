const mongoose = require('mongoose');

const pomodoroSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    nome: String,
    tempoEsforco: Number,
    tempoDescanso: Number
});

module.exports = mongoose.model('Pomodoro', pomodoroSchema);