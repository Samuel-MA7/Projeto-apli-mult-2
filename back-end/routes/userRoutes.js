const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')
const verificarToken = require('../middlewares/authMiddleware.js')

router.get('/profile',verificarToken,userController.perfilUsuario)

router.post('/cadastrar',userController.cadastrarUsuario)
router.post('/entrar',userController.logarUsuario)

module.exports = router