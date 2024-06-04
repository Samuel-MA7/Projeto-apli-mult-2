const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(4000, () => {
            console.log('Serviço de usuário conectado na porta 4000');
        });
    })
    .catch((err) => console.error('Falha ao tentar se conectar ao banco de dados de usuários!', err))