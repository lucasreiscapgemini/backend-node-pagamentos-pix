# Capgemini - Desafio Backend | Node Js

## Instruções para startar o projeto
* criar um arquivo .env sendo cópia do .env_example
* npm i -g knex
* npm i 
* knex migrate:latest
* knex seed:run
* npm run start

* link da coleção postman: https://www.getpostman.com/collections/595de6558a9d2ebd45dc

## Descrições
As configuraçõs de banco de dados, podem ser encontradas no arquivo.env.
O banco de dados usado neste exemplo foi o mysql ( Talvez seja necessário aplicar o metodo de autenticação nativa)
Exemplo: 
    - ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password ';
    - FLUSH PRIVILEGES;
As migrations são para que se possa montar as tabelas do banco de dados, sendo necessário ter o SCHEMA criado.
O comando knex seed:run irá criar dois usuários defaults para que se possa fazer autenticacao(também ha como criar um novo usuario), sendo eles:
    Dados de login:
        cpf: 00000000002
        senha: 1234
        ou
        cpf: 00000000001
        senha: 1234



