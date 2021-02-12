const bcrypt = require('bcrypt-nodejs')
const moment = require('moment')


module.exports = app =>{

    const meses = [
        '01','02','03','04','05','06','07','08','09','10','11','12'
    ]

    /**
     * 
     * @param lista // Lista de pagamentos a ser cauculada e aplicar a porcentagem para cada pagamento
     * @param id // Id caso seja aplicado a porcentagem de uma transação específica
     */
    function buscarPorcentagens(lista = null, id = null){


        let valorTotal = 0;
        if(lista !== null && lista.length > 0){
            //Busca o valor total das transações.
           lista.map(pag =>{
               valorTotal += pag.valor
           })
           // Inclui o atributi porcentagem nos pagamentos
           lista = lista.map(pag =>{
               pag.porcentagem = ( pag.valor * 100 )  / valorTotal;
               pag.porcentagem = pag.porcentagem.toFixed(2)
               moment.locale('pt-br')
               pag.data = moment(pag.data).format('DD/MM/YYYY')
               return pag;
           })
           // Caso exista um id, significa que terá retorno somente de uma transação
           if(id !== null){
               lista = lista.filter(pag => pag.id == id)[0]
           }
        }
        return lista
    }

    /**
     * Função para encriptar a senha de usuário
     * @param senha 
     */
    function encriptarSenha(senha){
        const salt = bcrypt.genSaltSync(10) // Aplica um salt para a encriptação da senha
        return bcrypt.hashSync(senha, salt)
    }



    return { buscarPorcentagens, encriptarSenha }
}


