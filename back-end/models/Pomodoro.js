const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PomodoroSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        //refere-se ao modelo de usuário do banco de dados de usuários
        ref: 'User'
    },
    nome: {
        type: String,
        required: true
    },
    tempoEsforco: {
        type: Number,
        required: true
    },
    tempoDescanso: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Pomodoro', PomodoroSchema)