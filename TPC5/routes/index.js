var express = require('express');
var router = express.Router();
var Tarefa = require('../controllers/tarefa')

/* GET home page. */
router.get('/', function(req, res, next) {
  Tarefa.Done()
    .then(done =>{
      Tarefa.toDo()
        .then(toDo =>{
          res.render('index', { toDo: toDo, done: done });
        }).catch(erro =>{
          res.render('error', {error: erro, message: "Erro na obtenção da lista de Tarefas ToDo :((((("}) 
        })
    }).catch(erro =>{
      res.render('error', {error: erro, message: "Erro na obtenção da lista de Tarefas Done :((((("}) 
    })
});

router.get('/done/:IdTarefa', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/edit/:IdTarefa', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/save/:IdTarefa', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
