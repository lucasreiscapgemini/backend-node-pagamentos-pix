exports.up = function(knex) {
  return knex.schema.createTable('pagamentos',table =>{
      table.increments('id').primary()
      table.string('nome')
      table.string('cpf')
      table.string('banco')
      table.string('chave_pix')
      table.decimal('valor', 10, 2)
      table.string('descricao')
      table.string('mes')
      table.timestamps(true,true)
      table.timestamp('deleted_at')
      table.integer('usuario_id').unsigned()
      table.foreign('usuario_id').references('usuarios.id')
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('pagamentos')
};
