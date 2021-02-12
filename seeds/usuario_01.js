const bcrypt = require('bcrypt-nodejs')
/**
 * Seed para criação de usuários default
 */
exports.seed = function(knex ) {

  // Deletes ALL existing entries
  return knex('usuarios').del()
    .then(function () {
      const encriptarSenha = senha =>{
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync('1234', salt)
      }
      // Inserts seed entries
      return knex('usuarios').insert([
        {
          nome: "MANOEL TAVARES",
          cpf: "00000000001",
          chave_pix: "manoeltavares.jr@gmail.com",
          senha: encriptarSenha('1234')
        },
        {
          nome: "TESTE 01",
          cpf: "00000000002",
          chave_pix: "00000000002",
          senha: encriptarSenha('1234')
        }
      ]);
    });
};
