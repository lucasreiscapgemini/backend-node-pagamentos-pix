# Capgemini - Desafio Backend | Node Js

## Descrição

Esta API foi criada utilizando algumas orientações do padrão arquitetural em camadas Model-View-Controller (MVC). Como metodologia foi adotado o Densenvolvimento Orientado a Testes.
## Pré requisitos mínimos

* Node.js v14.15.1

## Setup
* *Instale as dependências:* `` yarn install``
* *Com o CLI do ORM (Sequelize) crie o banco e execute as migrations:* ``yarn sequelize db:migrate``
* Variáveis de ambiente
+ .env
```text
DB_HOST=ec2-35-171-57-132.compute-1.amazonaws.com
DB_USER=aouhnshqyjbjsx
DB_PASS=0f8b9623567cb9db5ce16826fc9d9f49c729f4d5a4cf808daf5d408df36f7462
DB_NAME=d6j5oihm5lbkk3
NODE_TLS_REJECT_UNAUTHORIZED=0
```
+ .env.test
```text
DB_DIALECT=sqlite
```

## Testes
* *Execute o seguinte comando para rodar os testes:* `` yarn test ``

## Testes
* *Execute o seguinte comando para rodar os testes:* `` yarn dev ``
*  !!! Caso a aplicação esteja rodado em um sistema operacional osx remova os prefixos SET no package.json

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
