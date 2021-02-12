
// Modulo de rotas que utiliza o consign para fazer o mapeamento das dependencias.
module.exports = app =>{
    
    app.post('/logar', app.api.autenticacao.logar)
    app.post('/cadastar', app.api.autenticacao.criarUsuario)
    app.post('/validarToken', app.api.autenticacao.validarToken)

    app.route('/pagamentos')
        .all(app.config.passport.autenticacao()) // Usa o passaporte para que qualquer metodo nesse endpoit seja necessário o token
        .get(app.api.pagamentos.listar) // lista todos os pagamentos
        .post(app.api.pagamentos.criar) // cria um pagamento
        .put(app.api.pagamentos.criar) // edita o pagamento caso receba um id no body
        .get(app.api.pagamentos.listarDeletados) // lista os pagamentos que foram deletados
        
    app.route('/pagamentos/:id')
        .all(app.config.passport.autenticacao()) // Usa o passaporte para que qualquer metodo nesse endpoit seja necessário o token
        .get(app.api.pagamentos.buscarPorId) // busca um pagamento por id
        .delete(app.api.pagamentos.deletar) // realiza o softdelete de um pagamento
    app.route('/pagamentos/mes/:mes')
    .all(app.config.passport.autenticacao()) // Usa o passaporte para que qualquer metodo nesse endpoit seja necessário o token
    .get(app.api.pagamentos.listarPorMes) // busca um pagamento por id

}