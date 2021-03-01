const PixTransation = use("App/Models/PixTransation");
const error = use("App/Helpers/ErrorMessage");

class ExtractService {
  async index(user_id) {
    try {
      const payments = await PixTransation.query()
        .where("user_id", user_id)
        .fetch();
      return payments;
    } catch (e) {
      return error.message("Ocorreu um erro inesperado");
    }
  }

  async store(payment, type) {
    try {
      if (type == "payment") {
        payment.value = -Math.abs(payment.value);
        payment.type = "payment";
        const newExtractSender = await PixTransation.create(payment);
        return newExtractSender;
      } else {
        payment.user_id = payment.recipient_id;
        payment.type = "receipt";
        payment.value = Math.abs(payment.value);
        const newExtractRecipient = await PixTransation.create(payment);
        return newExtractRecipient;
      }
    } catch (e) {
      return error.message("Ocorreu um erro inesperado");
    }
  }
}

module.exports = new ExtractService();
