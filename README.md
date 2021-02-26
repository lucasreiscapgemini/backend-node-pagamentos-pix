# Capgemini - Desafio Backend | Node Js

## Descrição

Esta API foi criada utilizando algumas orientações do padrão arquitetural em camadas Model-View-Controller (MVC). Como metodologia foi adotado o Densenvolvimento Orientado a Testes.
## Pré requisitos mínimos

* Node.js v14.15.1
* PostgreSQL 13.1

## Setup
* *Instale as dependências:* `` yarn install``
* *Com o CLI do ORM (Sequelize) crie o banco e execute as migrations:* `` yarn sequelize db:create && yarn sequelize db:migrate``
* Variáveis de ambiente
+ .env
```text
DB_HOST=127.0.0.1
DB_USER=postgres
DB_PASS=8f8cab2aac464df3aca0b58c0e3759a8
DB_NAME=pix_development
```
+ .env.test
```text
DB_DIALECT=sqlite
```

## Testes
* *Execute o seguinte comando para rodar os testes:* `` yarn test ``


## Rotas da Aplicação
### Registro de pagamentos [POST: /pagamento]


| Parâmetro | Descrição |
|---|---|
| `nome_destinatario` | Nome do beneficiário. |
| `cpf` | CPF do beneficiário. |
| `institucao_bancaria` | Instituição bancária da conta do beneficiário |
| `chave_pix` | Chave PIX da conta do beneficiário. |
| `valor` | Valor a ser pago. |
| `descricao` | Descrição do pagamento. |

+ Request (application/json)

    + Body

            { 
                "nome_destinatario": "Ednilson Messias",
                "cpf": "05426083592",
                "institucao_bancaria": "Bradesco",
                "chave_pix": "79999627074",
                "valor": "700.00",
                "descricao": "Cadeira Escritório"
            }

+ Response 200 (application/json)

    + Body

            {
              "message": "Pagamento realizado com sucesso!"
            }

### Deleção de pagamentos [DEL: /pagamento/:id]


* Parâmetros
    + id: Identificador do pagamento

+ Response 200 (application/json)

    + Body

            {
              "message": "Pagamento deletado com sucesso!"
            }

### Atualização de pagamentos [PATCH: /pagamento/:id]
Nessa rota pode, por estar usando o método PATCH, um ou todos atributos podem ser fornecidos para atualização. 

| Parâmetro | Descrição |
|---|---|
| `nome_destinatario` | Nome do beneficiário. |
| `cpf` | do beneficiário. |
| `institucao_bancaria` | Instituição bancária da conta do beneficiário |
| `chave_pix` | Chave PIX da conta do beneficiário. |
| `valor` | Valor a ser pago. |
| `descricao` | Descrição do pagamento. |

+ Request (application/json)

    + Body

            { 
                "nome_destinatario": "Ednilson Messias",
                "cpf": "05426083592",
                "institucao_bancaria": "Bradesco",
                "chave_pix": "79999627074",
                "valor": "700.00",
                "descricao": "Cadeira Escritório"
            }

+ Response 200 (application/json)

    + Body

            {
              "message": "Pagamento atualizado com sucesso!"
            }
            
### Consulta de pagamentos por id [GET: /pagamento/:id]


* Parâmetros
    + id: Identificador do pagamento

+ Response 200 (application/json)

    + Body

            {
              "id": 2,
              "nome_destinatario": "Ednilson Messias",
              "cpf": "05426083592",
              "institucao_bancaria": "Bradesco",
              "chave_pix": "79999627074",
              "valor": 1300,
              "data_pagamento": "2021-02-26T19:41:21.487Z",
              "descricao": "Cadeira Gammer",
              "createdAt": "2021-02-26T19:52:03.428Z",
              "updatedAt": "2021-02-26T19:52:03.428Z"
            }
            
### Consulta de pagamentos pix com porcentagem de cada pagamento [GET: /pagamento/:chave_pix/:data]


* Parâmetros
    + chave_pix: chave pix cadastrada
    + data: data em que o pagamento foi feito em formato americano (Ex.: 2021-02-26) 

+ Response 200 (application/json)

    + Body

            {
              "pagamentos": [
                {
                  "nome_destinatario": "Ednilson Messias",
                  "cpf": "05426083592",
                  "institucao_bancaria": "Bradesco",
                  "chave_pix": "79999627074",
                  "valor": 700,
                  "data_pagamento": "2021-02-26T19:41:21.487Z",
                  "descricao": "Cadeira Escritório",
                  "porcentagem": 50.90909090909091
                },
                {
                  "nome_destinatario": "Ednilson Messias",
                  "cpf": "05426083592",
                  "institucao_bancaria": "Bradesco",
                  "chave_pix": "79999627074",
                  "valor": 300,
                  "data_pagamento": "2021-02-26T19:41:21.487Z",
                  "descricao": "Cadeira Gammer",
                  "porcentagem": 21.818181818181817
                },
                {
                  "nome_destinatario": "Ednilson Messias",
                  "cpf": "05426083592",
                  "institucao_bancaria": "Bradesco",
                  "chave_pix": "79999627074",
                  "valor": 375,
                  "data_pagamento": "2021-02-26T19:41:21.487Z",
                  "descricao": "Teclado Mecânico",
                  "porcentagem": 27.272727272727273
                }
              ]
            }           
