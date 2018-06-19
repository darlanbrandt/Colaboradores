var express = require('express');
var router = express.Router();
var colaborador = require("../controllers/ColaboradorController.js");

// Lista todos os colaboradores
router.get('/', function(req, res) {
  colaborador.list(req, res);
});

// Lista um único colaborador pela id
router.get('/show/:id', function(req, res) {
  colaborador.show(req, res);
});

// Cria um colaborador
router.get('/create', function(req, res) {
  colaborador.create(req, res);
});

// Salva o cadastro do colaborador
router.post('/save', function(req, res) {
  colaborador.save(req, res);
});

// Edita o cadastro colaborador
router.get('/edit/:id', function(req, res) {
  colaborador.edit(req, res);
});

// Grava a atualização do cadastro
router.post('/update/:id', function(req, res) {
  colaborador.update(req, res);
});

// Exclui o cadastro
router.post('/delete/:id', function(req, res, next) {
  colaborador.delete(req, res);
});

module.exports = router;
