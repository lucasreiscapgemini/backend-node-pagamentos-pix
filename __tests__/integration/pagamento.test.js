const request = require('supertest');
const app = require('../../src/app')
const { Pagamento } = require('../../src/app/models')
const factory = require('../factories');

describe('Registro de pagamentos',  () => {
    it('deve registrar um pagamento quando for passado parâmetros válidos', async() => {
        const { nome_destinatario, cpf, institucao_bancaria, chave_pix, valor, descricao} = await factory.create('Pagamento');
        let response = await request(app)
            .post("/pagamento")
            .send({ 
                nome_destinatario,
                cpf,
                institucao_bancaria,
                chave_pix,
                valor,
                descricao
            });

        expect(response.status).toBe(200)
    });

});

describe('Busca de pagamento por id',  () => {
    it('deve buscar um pagamento realizado por um id válido', async () => {
        let id = (await Pagamento.min('id'));
        let response = await request(app)
            .get("/pagamento/"+id)
            .send();

            expect(response.status).toBe(200);
    });

    it('deve retornar mensagem de error quando buscar um pagamento por um id inválido', async () => {
        let id = (await Pagamento.max('id'));
        id++;
        let response = await request(app)
            .get("/pagamento/"+id)
            .send();

            expect(response.body.message).toBe("Não existe pagamento para esse id!");
    });
});

//Continuar daqui
describe('Deleção de pagamento por id',  () => {
    it('deve deletar um pagamento realizado por um id válido', async () => {
        let id = (await Pagamento.min('id'));
        let response = await request(app)
            .del("/pagamento/"+id)
            .send();

            expect(response.status).toBe(200);
    });

    it('deve retornar mensagem de error quando buscar um pagamento por um id inválido', async () => {
        let id = (await Pagamento.max('id'));
        id++;
        let response = await request(app)
            .get("/pagamento/"+id)
            .send();

            expect(response.body.message).toBe("Não existe pagamento para esse id!");
    });
});