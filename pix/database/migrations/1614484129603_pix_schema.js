"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PixSchema extends Schema {
  up() {
    this.create("pixes", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("key", 120).notNullable();
      table.string("bank", 120).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("pixes");
  }
}

module.exports = PixSchema;
