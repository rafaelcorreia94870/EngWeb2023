var express = require('express');
var router = express.Router();
var Lista = require('../controllers/lista')

/*
GET /api/emd?res=OK - Devolve a lista de EMD com resultado "true";
GET /api/emd?modalidade=X - Devolve a lista de EMD referentes à modalidade passada como
parâmetro, X;
GET /api/atletas?gen=F - Devolve uma lista ordenada alfabeticamente com os nomes dos
atletas de género feminino;
GET /api/atletas?clube=X - Devolve uma lista ordenada alfabeticamente com os nomes dos
atletas do clube X.
*/
/* GET home page. */


router.get('/api/melhoremd', function(req, res, next) {
    Lista.melhorlist()
    .then(listas => {
      res.jsonp(listas)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção das listas de compras"})
    })

});

router.get('/api/emd', function(req, res, next) {
  console.log(req.query.res)
  if(req.query.res && req.query.res == "OK"){
    Lista.resulttrue(req.body)
    .then(lista => {
      res.jsonp(lista)
    })
    .catch(erro => {
      
      res.render('error', {error: erro, message: "Erro na inserção da lista"})
    })
  }
  else if ( req.query.modalidade){
    Lista.modalidadeX(req.query.modalidade)
    .then(lista => {
      res.jsonp(lista)
    })
    .catch(erro => {
      
      res.render('error', {error: erro, message: "Erro na inserção da lista"})
    })
  }
  else{
    Lista.list()
    .then(listas => {
      res.jsonp(listas)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção das listas de compras"})
    })
  }
});


router.get('/api/emd/:id', function(req, res) {
  Lista.getLista(req.params.id)
    .then(lista => {
      res.jsonp(lista)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de compras"})
    })
});

router.get('/api/modalidades', function(req, res) {
  Lista.modalidades()
    .then(lista => {
      res.jsonp(lista)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção das categorias"})
    })
});

router.get('/api/atletas', function(req, res, next) {
  console.log(req.query.res)
  if(req.query.gen && req.query.gen == "F"){
    Lista.atletasF(req.body)
    .then(lista => {
      res.jsonp(lista)
    })
    .catch(erro => {
      
      res.render('error', {error: erro, message: "Erro na inserção da lista"})
    })
  }
  else if ( req.query.clube){
  console.log(req.query.clube)
    Lista.clube(req.query.clube)
    .then(lista => {
      res.jsonp(lista)
    })
    .catch(erro => {
      
      res.render('error', {error: erro, message: "Erro na inserção da lista"})
    })
  }
});






module.exports = router;
