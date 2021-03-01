"use strict";

class StorePayment {
  get rules() {
    return {
      value: "required|number",
      pix_id: "required|number",
      description: "max:120",
    };
  }

  get messages() {
    return {
      "value.required": "Informe o valor da transferência.",
      "value.number": "Por favor, informe um valor numérico.",
      "pix_id.required": "Informe o id da chave PIX.",
      "pix_id.number": "Por favor, informe um valor numérico para o id do PIX.",
      "description.max":
        "Por favor, informe uma descrição de no máximo 120 caracteres.",
    };
  }

  get validateAll() {
    return true;
  }

  get sanitizationRules() {
    return {
      amount: "to_int",
      description: "trim",
    };
  }
}

module.exports = StorePayment;
