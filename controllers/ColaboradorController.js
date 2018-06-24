// Variável que importa o módulo Mongoose, que gerencia o BD Mongo
var mongoose = require("mongoose");
var Colaborador = require("../models/Colaborador");
 
var colaboradorController = {};

// Mostra a lista de Colaboradores
colaboradorController.list = function(req, res) {
  Colaborador.find({}).exec(function (err, colaboradores) {
    if (err) {
      console.log("Erro:", err);
    }
    else {
      // Gera a página com a lista de colaboradores
      res.render("../views/colaboradores/index", {colaboradores: colaboradores});
    }
  });
};

// Envia JSON com a lista de Colaboradores
colaboradorController.listJson = function(req, res) {
  Colaborador.find({}).exec(function (err, colaboradores) {
    if (err) {
      console.log("Erro:", err);
    }
    else {
      // Gera a página com a lista de colaboradores
      res.json(colaboradores);
    }
  });
};

// Retorna o colaborador de acordo com a id
colaboradorController.show = function(req, res) {
  // usa o request (req) para solicitar o id
  Colaborador.findOne({_id: req.params.id}).exec(function (err, colaborador) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/colaboradores/show", {colaborador: colaborador});
    }
  });
};

// Retorna o colaborador de acordo com o CPF
colaboradorController.showJson = function(req, res) {
  // usa o request (req) para solicitar o id
  Colaborador.findOne({_id: req.params.id}).exec(function (err, colaborador) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.json(colaborador);
    }
  });
};

// Gera um novo registro de colaborador
colaboradorController.create = function(req, res) {
  res.render("../views/colaboradores/create");
};

// Salva o registro
colaboradorController.save = function(req, res) {
  var colaborador = new Colaborador(req.body);

  colaborador.save(function(err) {
    if(err) {
      console.log(err);
      // se erro, retorna na mesma página
      res.render("../views/colaboradores/create");
    } else {
      /* vai para a página que retorna o colaborador de acordo com a id
      ainda retorna via console, mas o erro vai ser enviado para a página e controlado com jQuery*/
      console.log("Cadastro de colaborador efetuado com sucesso.");
      res.redirect("/colaboradores/show/"+colaborador._id);
    }
  });
};

// Edição do cadastro do colaborador
// Verificar o motivo de não trazer a data no campo "date"
colaboradorController.edit = function(req, res) {
  // utiliza o mesmo método de exibição de um colaborador
  Colaborador.findOne({_id: req.params.id}).exec(function (err, colaborador) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/colaboradores/edit", {colaborador: colaborador});
    }
  });
};

// Faz a atualização do colaborador
colaboradorController.update = function(req, res) {
  Colaborador.findByIdAndUpdate(req.params.id, { $set: { cpf: req.body.cpf, nome: req.body.nome, setor: req.body.setor, funcao: req.body.funcao, dataInicio: req.body.dataInicio, celularCorporativo: req.body.celularCorporativo }}, { new: true }, function (err, colaborador) {
    if (err) {
      console.log(err);
      res.render("../views/colaboradores/edit", {colaborador: req.body});
    }
    res.redirect("/colaboradores/show/"+colaborador._id);
  });
};

// Exclui um cadastro
colaboradorController.delete = function(req, res) {
  Colaborador.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Colaborador excluído!");
      res.redirect("/colaboradores");
    }
  });
};

module.exports = colaboradorController;
