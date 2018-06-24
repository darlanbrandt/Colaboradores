var mongoose = require('mongoose');

var Colaboradores = new mongoose.Schema({
  cpf: {type: String, required: true, unique: true},
  nome: {type: String, required: true},
  setor: {type: String, required: true},
  funcao: {type: String, required: true},
  dataInicio: Date,
  celularCorporativo: Boolean,
});

module.exports = mongoose.model('colaborador', Colaboradores);
