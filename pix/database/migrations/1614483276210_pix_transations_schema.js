"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PixTransationsSchema extends Schema {
  up() {
    this.create("pix_transations", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("recipient_id").notNullable();
      table.integer("sender_id").notNullable();
      table.string("recipient_name", 120).notNullable();
      table.string("recipient_cpf", 11).notNullable();
      table.string("sender_name", 120).notNullable();
      table.string("sender_cpf", 120).notNullable();
      table.enum("type", ["receipt", "payment"]).notNullable();
      table.string("key_pix", 120).notNullable();
      table.string("description", 120).notNullable();
      table.bigInteger("value").notNullable();
      table.enum("status", ["error", "success"]).defaultTo("success");
      table.string("bank", 120).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("pix_transations");
  }
}

module.exports = PixTransationsSchema;
