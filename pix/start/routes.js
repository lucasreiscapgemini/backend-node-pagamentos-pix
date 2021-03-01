"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

/* Login */
Route.post("/login", "AuthController.authenticater");

/* Buscar usuário por id */
Route.get("/users/:id", "UserController.show").middleware(["auth"]);
/* Cadastrar usuário */
Route.post("/users", "UserController.store").validator("StoreUser");
/* Atualizar usuário - apenas email e senha */
Route.put("/users/:id", "UserController.update")
  .middleware(["auth", "EmailOwner"])
  .validator("UpdateUser");

/* Criar chave PIX */
Route.post("/pix", "PixController.store")
  .middleware(["auth"])
  .validator("StorePix");
/* Buscar chave PIX pela chave */
Route.get("/pix/query", "PixController.getByKey").middleware(["auth"]);

/* Fazer Pagamentos */
Route.post("/pagamentos", "PixTransationController.store")
  .middleware(["auth"])
  .validator("StorePayment");
/* Listar pagamentos - extrato */
Route.get("/pagamentos", "PixTransationController.index").middleware(["auth"]);
/* Buscar pagamento por id */
Route.get("/pagamentos/:id", "PixTransationController.show").middleware([
  "auth",
]);
