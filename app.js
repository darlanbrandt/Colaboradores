// Imports dos módulos utilizados na aplicação
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var expressValidator = require('express-validator');

// Conexão com o BD
mongoose.connect('mongodb://lucas:ufsc18@ds163850.mlab.com:63850/colaboradores')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var index = require('./routes/index');
var users = require('./routes/users');
var colaboradores = require('./routes/colaboradores');
var json = require('./routes/json');

var app = express();


// Define o local das views e o formato (ejs)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(expressValidator());

app.use(require('./middleware/headers'));
app.use('/', index);
app.use('/users', users);
app.use('/colaboradores', colaboradores);
app.use('/json', json);

// Gerencia erro 404
app.use(function(req, res, next) {
  var err = new Error('Não encontrado');
  err.status = 404;
  next(err);
});

// Grrencia erros
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Gera a página de erro
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
