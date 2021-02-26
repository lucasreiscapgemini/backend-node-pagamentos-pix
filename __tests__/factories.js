const faker = require('faker');
const { factory } = require('factory-girl');
const { Pagamento } = require('../src/app/models');

factory.define('Pagamento', Pagamento, { 
    nome_destinatario: 'Ednilson Messias',
    cpf: '05426083592',
    institucao_bancaria: 'Bradesco',
    chave_pix: '79999627074',
    valor: faker.random.float(),
    descricao: faker.commerce.productName()
});

module.exports = factory;