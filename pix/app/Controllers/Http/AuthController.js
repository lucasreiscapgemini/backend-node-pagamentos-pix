"use strict";
const User = use("App/Models/User");
const error = use("App/Helpers/ErrorMessage");

class AuthController {
  async authenticater({ request, response, auth }) {
    const { email, password } = request.all();
    if (!(email && password))
      return response
        .status(400)
        .send(error.message("Informe o e-email e a senha para efetuar login."));
    else {
      const user = await User.findBy({ email });
      if (!user)
        return response
          .status(400)
          .send(error.message("E-mail não registrado."));
      const token = await auth.attempt(email, password);
      return { token, user };
    }
  }
}

module.exports = AuthController;

error.message("Informe o e-email e a senha para efetuar login.");

error.message("E-mail não registrado.");
