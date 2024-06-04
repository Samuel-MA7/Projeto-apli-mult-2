const express = require('express');
const { criarPomodoro, obterPomodoros } = require('../controllers/pomodoroController');
const verificarToken = require('../middlewares/verificarToken');

const router = express.Router();

router.post('/', verificarToken, criarPomodoro);
router.get('/', verificarToken, obterPomodoros);

module.exports = router;