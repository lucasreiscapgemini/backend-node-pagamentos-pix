const { Pagamento } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

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

    async fetchAll(req,res){
        try {
            let { chave_pix, data_pagamento } = req.params;
            
            if(typeof chave_pix !== 'string' || typeof data_pagamento !== 'string')
                return res.status(401).send({message: 'Parâmetros inválidos!'});

            const startedDate = new Date(`${data_pagamento} 00:00:00`);
            const endDate = new Date(`${data_pagamento} 23:59:59`);

            let pagamentos = await Pagamento.findAll({where: {chave_pix, data_pagamento: {[Op.between] : [startedDate , endDate ]}}});            
            if(typeof pagamentos === "undefined" || pagamentos === null || pagamentos.length === 0)
                return res.status(401).send({message: 'Não existem pagamentos para essa chave pix e data de pagamento!'});               

            let totais_por_mes = new Map()
            for (let pagamento of pagamentos) {
                let data_pagamento = moment(new Date(pagamento.data_pagamento), 'YYYY/MM/DD');
                const MES = data_pagamento.format('M');
                const ANO  = data_pagamento.format('YYYY');
                const KEY = MES+ANO;
                

                if(typeof totais_por_mes.get(KEY) === 'undefined') 
                    totais_por_mes.set(KEY,pagamento.valor);
                else 
                    totais_por_mes.set(KEY,pagamento.valor +  totais_por_mes.get(KEY));
            }
            let pagamentos_com_porcetagem = [];
            for (let pagamento of pagamentos) {
                let data_pagamento = moment(new Date(pagamento.data_pagamento), 'YYYY/MM/DD');
                const MES = data_pagamento.format('M');
                const ANO  = data_pagamento.format('YYYY');
                const KEY = MES+ANO;                
                const PORCENTAGEM_PROPOCIONAL_AO_MES = (pagamento.valor  * 100) / totais_por_mes.get(KEY);
                pagamento = {   
                    nome_destinatario: pagamento.nome_destinatario,
                    cpf: pagamento.cpf,
                    institucao_bancaria: pagamento.institucao_bancaria,
                    chave_pix: pagamento.chave_pix,
                    valor: pagamento.valor,
                    data_pagamento: pagamento.data_pagamento,
                    descricao: pagamento.descricao
                }

                pagamentos_com_porcetagem.push({...pagamento, porcentagem: PORCENTAGEM_PROPOCIONAL_AO_MES})
            }
            return res.status(200).send({pagamentos: pagamentos_com_porcetagem});
        } catch (error) {
            console.log(error)
            return res.status(401).send({message: 'Não foi possível consultar o pagamento desejado!'});            
        }
    }

    async delete(req,res){
        try {
            let pagamento = await Pagamento.findOne({where: {id: req.params.id}});

            if(typeof pagamento === "undefined" || pagamento === null)
                return res.status(401).send({message: 'Não existe pagamento para esse id!'});
            
            await pagamento.destroy()
            
            return res.status(200).send({message: 'Pagamento deletado com sucesso!'});

        } catch (error) {
            return res.status(401).send({message: 'Não foi possível consultar o pagamento desejado!'});            
        }
    }   

    async update(req,res){
        try {
            let pagamento = await Pagamento.findOne({where: {id: req.params.id}});

            if(typeof pagamento === "undefined" || pagamento === null)
                return res.status(401).send({message: 'Não existe pagamento para esse id!'});
            
            await pagamento.update(req.body)
            
            return res.status(200).send({message: 'Pagamento atualizado com sucesso!'});

        } catch (error) {
            return res.status(401).send({message: 'Não foi possível consultar o pagamento desejado!'});            
        }
    }    
}

module.exports = new PagamentoController();