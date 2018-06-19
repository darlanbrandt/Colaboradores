var mongoose = require('mongoose');

var Colaboradores = new mongoose.Schema({
  nome: String,
  setor: String,
  funcao: String,
  cpf: String,
  dataInicio: Date,
  celularCorporativo: Boolean,
});

module.exports = mongoose.model('colaborador', Colaboradores);
