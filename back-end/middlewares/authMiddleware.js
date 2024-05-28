const jwt = require('jsonwebtoken')
const User = require('../models/User.js')

//middleware para verificar token
function verificarToken(req,res,next){
    const token = req.headers['authorization']?.split(' ')[1]
    if(!token){
        return res.status(403).json({ msg: 'Acesso negado!' })
    }

    try{
        const decodificar = jwt.verify(token,process.env.SECRET)
        req.userId = decodificar.id
        next()
    }catch(error){
        res.status(401).json({ msg: 'Token inválido!' })
    }
}

module.exports = verificarToken