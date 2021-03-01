"use strict";
const Pix = use("App/Models/Pix");
const error = use("App/Helpers/ErrorMessage");

class PixController {
  async store({ auth, request, response }) {
    try {
      const data = request.only(["key", "bank"]);
      const targetPix = await Pix.create({
        ...data,
        user_id: auth.user.id,
      });
      return targetPix;
    } catch (e) {
      return response
        .status(400)
        .send(error.message("Ocorreu um erro inesperado"));
    }
  }

  async getByKey({ request, response }) {
    try {
      const data = request.only(["key"]);
      const targetPix = await Pix.findBy(data);
      if (!targetPix) return false;
      await targetPix.loadMany(["user"]);
      return targetPix;
    } catch (e) {
      return response
        .status(400)
        .send(error.message("Ocorreu um erro inesperado"));
    }
  }
}

module.exports = PixController;
