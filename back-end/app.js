//importações de bibliotecas
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const app = express()
const PORT = 3000

//usar os arquivos da pasta fron-end
app.use(express.static(path.join(__dirname,'../front-end')))

//configurar express para uso de json
app.use(express.json())

//impotar rotas e usar
const userRoutes = require('./routes/userRoutes.js')
app.use('/auth',userRoutes)

//middleware para verificar token
const verificarToken = (req,res,next) => {
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

//rotas
//raiz pública
app.get('/',(req,res)=>{
    res.status(200).json({ msg:'Rota raiz da API!' })
})
//perfil do usuário
app.get('/profile',verificarToken,async(req,res) => {
    try{
        //excluir o campo de senha
        const usuario = await User.findById(req.userId,'-senha')
        if(!usuario){
            return res.status(404).json({ msg: 'Usuário não encontrado!' })
        }
        res.status(200).json(usuario)
    }catch(error){
        res.status(500).json({ msg: 'Ocorreu um erro no servidor!' })
    }
})

//conectar ao banco de dados mongo
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    //iniciar o servidor
    app.listen(PORT,()=>{
        console.log(`Servidor ativo na porta ${PORT}!`)
    })
    console.log('Conectado ao banco de dados com sucesso!')
}).catch((err)=>console.log(err))