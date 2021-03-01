"use strict";

class UpdateUser {
  get rules() {
    return {
      email: "email",
      password: "min:6",
    };
  }

  get messages() {
    return {
      "email.email": "Informe um e-mail válido.",
      "password.min": "Por favor, informe uma senha com mais de 5 caracteres.",
    };
  }

  get validateAll() {
    return true;
  }

  get sanitizationRules() {
    return {
      email: "normalize_email",
      password: "trim",
    };
  }
}

module.exports = UpdateUser;
