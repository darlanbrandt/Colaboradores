var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'INE5646 - Cadastro de Colaboradores' });
});

module.exports = router;
