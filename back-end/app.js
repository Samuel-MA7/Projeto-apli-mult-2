//importações de bibliotecas
const express = require('express')
const mongoose = require('mongoose')
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

//raiz pública
app.get('/',(req,res)=>{
    res.status(200).json({ msg:'Rota raiz da API!' })
})

//conectar ao banco de dados mongo
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    //iniciar o servidor
    app.listen(PORT,()=>{
        console.log(`Servidor ativo na porta ${PORT}!`)
    })
    console.log('Conectado ao banco de dados com sucesso!')
}).catch((err)=>console.log(err))