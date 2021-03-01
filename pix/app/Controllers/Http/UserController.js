"use strict";

const User = use("App/Models/User");
const error = use("App/Helpers/ErrorMessage");

class UserController {
  async store({ request, response }) {
    try {
      const data = request.only(["username", "cpf", "email", "password"]);
      const targetUser = await User.create(data);
      return targetUser;
    } catch (e) {
      return response
        .status(400)
        .send(error.message("Ocorreu um erro inesperado"));
    }
  }
  async show({ params, response }) {
    try {
      const targetUser = await User.find(params.id);
      if (!targetUser) return false;
      await targetUser.loadMany(["pix"]);
      return targetUser;
    } catch (e) {
      return response
        .status(400)
        .send(error.message("Ocorreu um erro inesperado"));
    }
  }
  async update({ params, request, response }) {
    try {
      const data = request.only(["email", "password"]);
      const targetUser = await User.find(params.id);
      if (!targetUser) return false;
      targetUser.merge(data);
      await targetUser.save();
      return targetUser;
    } catch (e) {
      return response
        .status(400)
        .send(error.message("Ocorreu um erro inesperado"));
    }
  }
}

module.exports = UserController;
