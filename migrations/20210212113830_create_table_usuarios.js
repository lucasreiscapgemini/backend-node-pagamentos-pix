
exports.up = function(knex) {
  return knex.schema.createTable('usuarios', table =>{
      table.increments('id').primary()
      table.string('nome').notNull()
      table.string('cpf').notNull()
      table.unique('cpf')
      table.string('senha')
      table.string('chave_pix')
      table.timestamps(true,true)
  })
};

exports.down = function(knex) {
  return knex.schema.dtopTable('usuarios')
};
