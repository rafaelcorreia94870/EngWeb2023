var express = require('express');
var router = express.Router();
var Tarefa = require('../controllers/tarefa')

/* GET home page. */
router.get('/', function(req, res, next) {
  Tarefa.Done()
    .then(done =>{
      Tarefa.toDo()
        .then(toDo =>{
          if(req.data){
            res.render('index', { toDo: toDo, done: done, editId: req.data.id });
          }
          else{
            res.render('index', { toDo: toDo, done: done});
          }
        }).catch(erro =>{
          res.render('error', {error: erro, message: "Erro na obtenção da lista de Tarefas ToDo :((((("}) 
        })
    }).catch(erro =>{
      res.render('error', {error: erro, message: "Erro na obtenção da lista de Tarefas Done :((((("}) 
    })
});

router.get('/done/:IdTarefa', function(req, res, next) {
  Tarefa.getTarefa(req.params.IdTarefa)
    .then(tarefa=>{
        Tarefa.doneTarefa(tarefa)
      .then(_=>{
        res.redirect('/')
      })
      .catch(err =>{
        res.render('error', {error: erro, message: "Erro no done tarefa :((((("}) 
      })
    })
  
});

router.get('/edit/:IdTarefa', function(req, res, next) {
  Tarefa.Done()
    .then(done =>{
      Tarefa.toDo()
        .then(toDo =>{
          res.render('index', { toDo: toDo, done: done, editId: req.params.IdTarefa});
        }).catch(erro =>{
          res.render('error', {error: erro, message: "Erro na obtenção da lista de Tarefas ToDo :((((("}) 
        })
    }).catch(erro =>{
      res.render('error', {error: erro, message: "Erro na obtenção da lista de Tarefas Done :((((("}) 
    })
});


router.post('/', function(req,res,next) {
  Tarefa.addTarefa(req.body)
    .then(nada=>{
      res.redirect('/')
    })
    .catch(erro=>{
      res.render('error', {error: erro, message: "Erro ao adicionar:((((("}) 
    })
})

router.post('/edit/:IdTarefa', function(req, res, next) {
  req.body.id=req.params.IdTarefa
  req.body.done="False"
  Tarefa.saveTarefa(req.body)
    .then(tarefaedit=>{
      res.redirect('/')
    })
    .catch(err =>{
      res.render('error', {error: erro, message: "Erro no done tarefa :((((("}) 

    })
});
module.exports = router;
