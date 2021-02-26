'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pagamento extends Model {
    static associate(models) {
    }
  };
  Pagamento.init({
    nome_destinatario: DataTypes.STRING,
    cpf: DataTypes.STRING,
    institucao_bancaria: DataTypes.STRING,
    chave_pix: DataTypes.STRING,
    valor: DataTypes.FLOAT,
    data_pagamento: DataTypes.DATE,
    descricao: DataTypes.STRING
  }, {
    sequelize,
    underscored: true,
    modelName: 'Pagamento',
  });
  
  return Pagamento;
};