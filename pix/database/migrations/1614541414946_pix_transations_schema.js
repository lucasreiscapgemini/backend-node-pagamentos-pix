"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PixTransationsSchema extends Schema {
  up() {
    this.table("pix_transations", (table) => {
      // alter table
    });
  }

  down() {
    this.table("pix_transations", (table) => {
      table.string("description", 120).alter();
    });
  }
}

module.exports = PixTransationsSchema;
