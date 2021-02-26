
const routes = require('express').Router();

const  PagamentoController  = require("./app/controllers/PagamentoController");

routes.post("/pagamento", PagamentoController.create)
routes.get("/pagamento/:id", PagamentoController.fetch)
routes.get("/pagamentos/:chave_pix/:data_pagamento", PagamentoController.fetchAll)
routes.delete("/pagamento/:id", PagamentoController.delete)
routes.patch("/pagamento/:id", PagamentoController.update)

module.exports = routes;