
const routes = require('express').Router();

const  PagamentoController  = require("./app/controllers/PagamentoController");

routes.post("/pagamento", PagamentoController.create)
routes.get("/pagamento/:id", PagamentoController.fetch)
routes.delete("/pagamento/:id", PagamentoController.delete)

module.exports = routes;