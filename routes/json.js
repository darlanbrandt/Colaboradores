var express = require('express');
var router = express.Router();
var colaborador = require("../controllers/ColaboradorController.js");

// Lista todos os colaboradores
router.get('/list', function(req, res) {
  colaborador.listJson(req, res);
});

router.get('/show/:id', function(req, res) {
  colaborador.showJson(req, res);
});

module.exports = router;