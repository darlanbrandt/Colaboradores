var express = require('express');
var router = express.Router();
var colaborador = require("../controllers/ColaboradorController.js");

// Lista todos os colaboradores
router.get('/', function(req, res) {
  colaborador.listJson(req, res);
});

module.exports = router;