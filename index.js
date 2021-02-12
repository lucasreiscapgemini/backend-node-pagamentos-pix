const {app_port } = require('./.env')
//Importa o express para fazer o roteamento
const app = require('express')()
//Importa o consign para injetar os modulos de outros arquivos
const consign = require('consign')

const database = require('./config/database')

//Passa para o app as configurações de banco de dados
app.db = database

// Consign ajuda no gerenciamento de dependencias para que fique centralizado o uso de outros arquivos.
consign()
    .include('./config/passport.js')
    .then('./config/middleware.js')
    .then('./api')
    .then('./util')
    .then('./config/route.js')
    .into(app)


// Rota root para verificar a api.
app.listen(app_port || 8080, () =>{
    console.log('Bradesco Api Pix Iniciada: ', app_port)
})