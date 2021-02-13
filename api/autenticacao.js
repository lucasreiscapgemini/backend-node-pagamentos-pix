const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')


module.exports = app =>{
    
    /**
     * Função para logar na api, usando usuário e senha, retornando um payload com os dados do usuario
     * e com o token de acesso.
     */
    const logar = async (req, res ) =>{
        if(!req.body.cpf || !req.body.senha){
            return res.status(400).send('Informe todos os campos.')
        }

      
        const usuario = await app.db('usuarios')
            .where({ cpf: req.body.cpf })
            .first()
        if(!usuario) return res.status(400).send('Usuário não encontrado.')

        const isIgual = bcrypt.compareSync(req.body.senha, usuario.senha)
        if(!isIgual) return res.status(401).send('Cpf/Senha inválidos');

        const momento = Math.floor(Date.now() / 1000)

        const retorno = {
            id: usuario.id,
            nome: usuario.nome,
            chave_pix: usuario.chave_pix,
            cpf: usuario.cpf,
            iat: momento,
            expiracao: momento + (60 * 60 * 24 * 3)
        }

        res.json({
            ...retorno,
            access_token: jwt.encode(retorno, authSecret)
        })
    }

    /**
     * Criar um usuário para poder fazer as transações pix
     */
    const criarUsuario = (req, res ) =>{
         
        const dados = { ...req.body }
       
        const { encriptarSenha } = app.util.comuns
        const { validarCadastro } = app.util.validadores

        const validacao = validarCadastro(dados)
        if(!validacao.valido){
            return res.status(400).send(validacao.msg);
        }

        dados.senha = encriptarSenha(dados.senha)
        delete dados.confirmarSenha

        app.db('usuarios')
            .insert(dados)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        
    }

    const validarToken = async ( req, res) =>{
        const dados = req.body || null;
        
        //verifica se o token está validao ainda de acordo com a expiração do mesmo
        try{
            if(dados){
                const accss_token = jwt.decode(dados.access_token, authSecret)
                if(new Date(accss_token.expiracao * 1000) > new Date()){
                    return res.send(true)
                }
            }
        }catch( ex ){
            return res.send(false)
        }
        return res.send(false)
       
    }

    return { logar, criarUsuario, validarToken }
}