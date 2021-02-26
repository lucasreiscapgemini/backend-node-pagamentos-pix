const { Pagamento } = require('../models');

class PagamentoController {
    async create(req,res){
        try {
            await Pagamento.create(req.body);
            return res.status(200).send({message: 'Pagamento realizado com sucesso!'});
        } catch (error) {
            return res.status(401).send({message: 'Erro ao tentar realizar pagamento!'});            
        }

    }

    async fetch(req,res){
        try {
            let pagamento = await Pagamento.findOne({where: {id: req.params.id}});

            if(typeof pagamento === "undefined" || pagamento === null)
                return res.status(401).send({message: 'Não existe pagamento para esse id!'});
            
            return res.status(200).send(pagamento);

        } catch (error) {
            return res.status(401).send({message: 'Não foi possível consultar o pagamento desejado!'});            
        }
    }

    async delete(req,res){
        try {
            let pagamento = await Pagamento.findOne({where: {id: req.params.id}});

            if(typeof pagamento === "undefined" || pagamento === null)
                return res.status(401).send({message: 'Não existe pagamento para esse id!'});
            
            await pagamento.destroy()
            
            return res.status(200).send(pagamento);

        } catch (error) {
            return res.status(401).send({message: 'Não foi possível consultar o pagamento desejado!'});            
        }
    }    
}

module.exports = new PagamentoController();