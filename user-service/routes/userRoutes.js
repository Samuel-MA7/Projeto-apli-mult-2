const express = require('express');
const { cadastrarUsuario, logarUsuario, obterPerfil } = require('../controllers/userController');
const verificarToken = require('../middlewares/verificarToken');

const router = express.Router();

router.post('/cadastrar', cadastrarUsuario);
router.post('/entrar', logarUsuario);
router.get('/profile', verificarToken, obterPerfil);

module.exports = router