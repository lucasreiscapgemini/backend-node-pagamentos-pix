const moment = require('moment')

module.exports = app =>{

    let mes_vigente = moment().format('MM');
    /**
     * Lista todos os pagamentos aplicando a regra de softdelete
     */
    const listar = (req, res) =>{

        const { buscarPorcentagens } = app.util.comuns
        app.db('pagamentos')
            .select('id','nome','cpf','banco','chave_pix','valor','descricao','mes','created_at as data')
            .where({
                deleted_at: null,
                usuario_id: req.user.id,
                mes: mes_vigente
            }).orderBy('id','desc').then(pagamentos => res.status(200).json(buscarPorcentagens(pagamentos)))
            .catch(err => res.status(500).send(err))
    }

    const listarPorMes = (req, res) =>{

        const { buscarPorcentagens } = app.util.comuns
        app.db('pagamentos')
            .select('id','nome','cpf','banco','chave_pix','valor','descricao','mes','created_at as data')
            .where({
                deleted_at: null,
                usuario_id: req.user.id,
                mes: req.params.mes
            }).orderBy('id','desc').then(pagamentos => res.status(200).json(buscarPorcentagens(pagamentos)))
            .catch(err => res.status(500).send(err))
    }

    /**
     * Busca os detalhes de um pagamento específico
     */
    const buscarPorId = (req, res) =>{
        const { buscarPorcentagens } = app.util.comuns
            app.db('pagamentos')
            .select('id','nome','cpf','banco','chave_pix','valor','descricao','mes','created_at as data')
            .where({
                id: req.params.id, deleted_at: null,
                usuario_id: req.user.id
            }).first()
            .then(pag => {
                if(pag.id){
                    app.db('pagamentos')
                    .select('id','nome','cpf','banco','chave_pix','valor','descricao','mes','created_at as data').where({
                        deleted_at: null,
                        usuario_id: req.user.id,
                        mes: pag.mes
                    }).then(pagamentos => res.status(200).json(buscarPorcentagens(pagamentos,pag.id)))
                }else{
                    res.status(400).send('Id não encontrado')
                }
            })
            .catch(err => res.status(400).send(err))
    }


    /**
     * Função para criar um pagamento
     */
    const criar = (req, res) =>{

        const { validarPagamento } = app.util.validadores
        const { buscarPorcentagens } = app.util.comuns
        const pagamento = { ...req.body }
        const valid = validarPagamento(pagamento)
        if(valid.length > 0){
            res.status(400).send(valid)
        }else{
            if(pagamento.id){
                app.db('pagamentos')
                .where({ id: pagamento.id })
                .update(pagamento)
                .then(_ => res.status(200).json({ message: `Pagamento: ${pagamento.id} editado com sucesso.`}))
                .catch(err => res.status(500).send(err))
                
            }else{
                pagamento.usuario_id = req.user.id
                pagamento.mes = moment().format('MM')
                app.db('pagamentos')
                .insert(pagamento).then( id =>{
                    app.db('pagamentos')
                        .select('id','nome','cpf','banco','chave_pix','valor','descricao','mes','created_at as data').where({
                            deleted_at: null
                        }).then(pagamentos => res.status(200).json(buscarPorcentagens(pagamentos,id[0])))
                })
                .catch(err => res.status(500).send(err))
            }
            
            
        }

    }

    /**
     * Função para realizar o softdelete de um pagamento
     */
    const deletar = (req, res) =>{
     
        const id = req.params.id
        if(id && id !== 0){
            app.db('pagamentos')
                .where({ id: id, usuario_id: req.user.id })
                .update({
                    deleted_at: new Date()
                })
                .then(_ => res.status(200).json({ message: `Pagamento: ${id} deletado com sucesso.` }))
                .catch(err => res.status(500).send(err))
        }

    }

    const listarDeletados = (req, res) =>{
        app.db('pagamentos')
                .where({ deleted_at: null, usuario_id: req.user.id })
                .orderBy('deleted_at', 'desc')
                .then(pagamentos_deletados => res.status(200).json(pagamentos_deletados))
                .catch(err => res.status(500).send(err))
    }

    
    return { listar,listarPorMes, criar, buscarPorId, deletar, listarDeletados }

}