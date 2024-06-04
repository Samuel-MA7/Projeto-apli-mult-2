const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const pomodoroRoutes = require('./routes/pomodoroRoutes');

const app = express();
app.use(express.json());

app.use('/api/pomodoros', pomodoroRoutes);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(5000, () => {
            console.log('Pomodoro service running on port 5000');
        });
    })
    .catch((err) => console.error('Failed to connect to MongoDB', err));