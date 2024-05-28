const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')

router.post('/cadastrar',userController.cadastrarUsuario)
router.post('/entrar',userController.logarUsuario)

module.exports = router