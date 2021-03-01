"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PixSchema extends Schema {
  up() {
    this.table("pixes", (table) => {
      table.string("key", 120).notNullable().unique().alter();
    });
  }

  down() {
    this.table("pixes", (table) => {
      // reverse alternations
    });
  }
}

module.exports = PixSchema;
