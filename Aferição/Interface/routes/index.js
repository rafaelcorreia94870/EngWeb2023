var express = require('express');
var router = express.Router();
var axios = require('axios');
const { response } = require('../app');

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get("http://localhost:3000/api/melhoremd")
    .then(response =>{
      console.log(response.data)
      res.render('index', {u: response.data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na inserção da lista"})
    })
});

router.get('/:id', function(req, res, next) {
  axios.get("http://localhost:3000/api/emd/"+ req.params.id)
    .then(response =>{
      console.log(response.data)
      res.render('exam', {u: response.data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na inserção da lista"})
    })
});

module.exports = router;
