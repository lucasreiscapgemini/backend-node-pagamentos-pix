const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt
const { authSecret } = require('../.env')

module.exports = app =>{
    
    const parametros = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const estrategia = new Strategy(parametros, (retorno, confirmacao) =>{
        app.db('usuarios')
            .where({
                id: retorno.id
            })
            .first()
            .then(usuario => confirmacao(null, usuario ? {...retorno } : false ))
            .catch(err => confirmacao(err, false))
    })

    passport.use(estrategia)

    return { autenticacao: () => passport.authenticate('jwt',{ session: false }) }
}