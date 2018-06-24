var express = require('express');
var router = express.Router();
var colaborador = require("../controllers/ColaboradorController.js");
var Colaborador = require('../models/Colaborador')

// Lista todos os colaboradores
router.get('/', function(req, res) {
  colaborador.list(req, res);
});

// Lista um único colaborador pela id
router.get('/show/:id', function(req, res) {
  colaborador.show(req, res);
});

// Cria um colaborador
router.get('/cadastrar', function(req, res) {
  res.render("../views/colaboradores/cadastrar");
});

/* Salva o cadastro do colaborador
router.post('/save', function(req, res) {
  colaborador.save(req, res);
});
*/

// Edita o cadastro colaborador
router.get('/edit/:id', function(req, res) {
  colaborador.edit(req, res);
});

// Grava a atualização do cadastro
router.put('/:id', (req, res) => {
  Colaborador.findOne({_id: req.params.id}).then((colaborador) => {
    colaborador.cpf = req.body.colaborador.cpf,
    colaborador.nome = req.body.colaborador.nome,
    colaborador.setor = req.body.colaborador.setor,
    colaborador.funcao = req.body.colaborador.funcao,
    colaborador.dataInicio = req.body.colaborador.dataInicio,
    colaborador.celularCorporativo = req.body.colaborador.celularCorporativo

    colaborador.save().then((colaborador) => {
      res.json({
        message: 'Atualizado',
        colaborador: colaborador
      });
      console.log("Cadastro de colaborador atualizado com sucesso.");
      res.redirect("/colaboradores/show/"+colaborador._id);
    });
  });
});

// Exclui o cadastro
router.post('/delete/:id', function(req, res, next) {
  colaborador.delete(req, res);
});

router.post('/salvar', (req, res) => {
  var colaborador = new Colaborador({
    cpf: req.body.colaborador.cpf,
    nome: req.body.colaborador.nome,
    setor: req.body.colaborador.setor,
    funcao: req.body.colaborador.funcao,
    dataInicio: req.body.colaborador.dataInicio,
    celularCorporativo: req.body.colaborador.celularCorporativo,
  });

  colaborador.save().then(
    (novoColaborador) => {
      res.json({
        colaborador: novoColaborador,
        message: 'Sucesso'
      });
      console.log("Cadastro de colaborador efetuado com sucesso.");
      res.redirect("/colaboradores/show/"+colaborador._id);
    },
    (err) => {
      res.status(500).send(err.message)
    }
  );
});

module.exports = router;
