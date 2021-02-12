const bodyParser = require("body-parser")
const cors = require('cors')

/**
 * 
 * @param app // Contexto da applicação ( Express )
 * Realiza a injeção de dependencias que poderar ser utilizada em qualquer lugar que possua o app do express 
 */
module.exports = app =>{
    app.use(bodyParser.json())
    app.use(cors())
}