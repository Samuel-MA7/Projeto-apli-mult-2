//importações de bibliotecas
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const path = require('path')

const app = express()
const PORT = 3000

//usar os arquivos da pasta fron-end
app.use(express.static(path.join(__dirname,'front-end')))

//configurar express para uso de json
app.use(express.json())

//importação de model
const User = require('./models/User.js')

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
});
//cadastrar usuário
app.post('/auth/cadastrar',async(req,res)=>{
    const { nome, email, senha, senha_confirmada } = req.body
    if(!nome || !email || !senha || !senha_confirmada){
        return res.status(422).json({ msg:'Há campos que ainda precisam ser preenchidos!' })
    }else if(senha_confirmada !== senha){
        return res.status(422).json({ msg:'Os campos de senhas não estão correspondendo!' })
    }
    //checar se o usuário já existe
    const usuarioExistente = await User.findOne({ email:email })
    if(usuarioExistente){
        return res.status(422).json({ msg:'O email fornecido já está cadastrado!' })
    }
    //criar a senha criptografada
    const salt = await bcrypt.genSalt(12)
    const senhaHash = await bcrypt.hash(senha,salt)
    //criar o usuário
    const usuario = new User({
        nome,
        email,
        senha: senhaHash
    })
    try {
        await usuario.save()
        res.status(201).json({ msg:'Usuário cadastrado com sucesso!' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg:'Ocorreu um erro no servidor!' })
    }
})
//logar usuário
app.post('/auth/entrar',async(req,res)=>{
    const { email, senha } = req.body
    if(!email || !senha){
        return res.status(422).json({ msg:'Preencha todos os campos!' })
    }
    //checar se o usuário existe
    const usuario = await User.findOne({ email:email })
    if(!usuario){
        return res.status(404).json({ msg:'Não há usuário cadastrado com esse email!' })
    }
    //comparar a senha fornecida com a do banco de dados
    const senha_comparada = await bcrypt.compare(senha,usuario.senha)
    if(!senha_comparada){
        return res.status(422).json({ msg:'Senha inválida!' })
    }
    try {
        const token = jwt.sign(
            {
                id:usuario._id
            },
            process.env.SECRET
        )
        res.status(200).json({ msg:'Login realizado com sucesso!',token })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg:'Ocorreu um erro no servidor!' })
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