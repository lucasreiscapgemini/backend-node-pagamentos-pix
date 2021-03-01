"use strict";

class StorePix {
  get rules() {
    return {
      key: "required|max:120|unique:pixes",
      bank: "required|max:120",
    };
  }

  get messages() {
    return {
      "bank.required": "Por favor, informe o banco da chave PIX.",
      "key.required": "Por favor, informe a chave PIX.",
      "key.unique": "Essa chave PIX já está em uso.",
      "key.max": "A chave PIX deve possuir no máximo 120 caracteres.",
      "bank.max": "O banco deve possuir no máximo 120 caracteres.",
    };
  }

  get validateAll() {
    return true;
  }

  get sanitizationRules() {
    return {
      key: "trim",
      bank: "trim",
    };
  }
}

module.exports = StorePix;
