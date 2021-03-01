"use strict";
const PixTransation = use("App/Models/PixTransation");
const Pix = use("App/Models/Pix");
const User = use("App/Models/User");
const ExtractService = use("App/Services/ExtractService");
const error = use("App/Helpers/ErrorMessage");

class PixTransationController {
  async index({ auth, response }) {
    try {
      const payments = await ExtractService.index(auth.user.id);
      return payments;
    } catch (e) {
      return response
        .status(400)
        .send(error.message("Ocorreu um erro inesperado"));
    }
  }

  async show({ params, response }) {
    try {
      const targetPayment = await PixTransation.find(params.id);
      if (!targetPayment) return {};
      return targetPayment;
    } catch (e) {
      return response
        .status(400)
        .send(error.message("Ocorreu um erro inesperado"));
    }
  }

  async store({ auth, request, response }) {
    try {
      const sender = auth.user;
      const data = request.only(["value", "pix_id", "description"]);
      const pix_id = data.pix_id;
      const pix = await Pix.find(pix_id);
      const user_pix_id = pix.user_id;
      const userRecipient = await User.find(user_pix_id);
      const payment = this.mountPaymentObject(sender, userRecipient, pix, data);
      const senderExtract = await ExtractService.store(payment, "payment");
      const receiptExtract = await ExtractService.store(payment, "receipt");
      return {
        senderExtract,
        receiptExtract,
      };
    } catch (e) {
      return response
        .status(400)
        .send(error.message("Ocorreu um erro inesperado"));
    }
  }

  mountPaymentObject(sender, userRecipient, pix, data) {
    try {
      return {
        user_id: sender.id,
        sender_id: sender.id,
        sender_name: sender.username,
        sender_cpf: sender.cpf,
        recipient_id: userRecipient.id,
        recipient_name: userRecipient.username,
        recipient_cpf: userRecipient.cpf,
        bank: pix.bank,
        key_pix: pix.key,
        description: data.description,
        value: data.value,
      };
    } catch (e) {
      return error.message("Ocorreu um erro inesperado");
    }
  }
}

module.exports = PixTransationController;
