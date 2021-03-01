"use strict";

class StoreUser {
  get rules() {
    return {
      username: "required|min:2",
      email: "email|unique:users",
      password: "min:6",
      cpf: "min:11|max:11|unique:users",
      type: "in:master,edit,query,user",
    };
  }

  get messages() {
    return {
      "username.required": "Informe o nome.",
      "username.min": "Por favor, informe um nome com mais de 1 caractere.",
      "email.email": "Informe um e-mail válido.",
      "email.unique": "Esse e-mail já está cadastrado em outro usuário",
      "password.min": "Por favor, informe uma senha com mais de 5 caracteres.",
      "cpf.min": "O CPF deve possuir 11 caracteres.",
      "cpf.max": "O CPF deve possuir 11 caracteres.",
      "cpf.unique": "Esse CPf já está cadastrado em outro usuário",
      "type.in":
        "O tipo de acesso deve ser: master, edição, consulta ou usuário.",
    };
  }

  get validateAll() {
    return true;
  }

  get sanitizationRules() {
    return {
      email: "normalize_email",
      password: "trim",
      cpf: "trim",
      username: "trim",
    };
  }
}

module.exports = StoreUser;
