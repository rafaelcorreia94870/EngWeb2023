var http =require('http');
const axios = require('axios')
var pages = require('./mypages')
var fs = require('fs')

http.createServer(function(req,res){
    var d = new Date().toISOString().substring(0,16)
    console.log(req.method+ " "+req.url+" "+d)
    if (req.url=="/pessoas"){
        console.log("/pessoas")
        axios.get("http://localhost:3000/pessoas?_sort=nome").then(resp => {
            var pessoas = resp.data
            console.log("Recuperei "+pessoas.length+ " registos.")
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end(pages.genMainPage(pessoas,d))
        })
        .catch(erro => {
            console.log("Erro: "+ erro)
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end("<p>ERRO:" + erro+"</p>")
        })}
    else if(req.url == "/ordDesc"){
        console.log("/ord/Desc")
        axios.get("http://localhost:3000/pessoas").then(resp => {
            var pessoas = resp.data
            let pessoasOrdenadas = pessoas.sort(
                (p1, p2) => (p1.nome < p2.nome) ? 1 : -1
            )
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end(pages.genMainPage(pessoasOrdenadas,d))
        })
        .catch(erro => {
            console.log("Erro: "+ erro)
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end("<p>ERRO:" + erro+"</p>")
        })}
    else if (req.url == "/sexo"){
            console.log("/sexo")
            let count ={
                feminino:0,
                masculino:0,
                outro:0
            };
            axios.get("http://localhost:3000/pessoas").then(resp => {
                var pessoas = resp.data
                pessoas.forEach(p => {
                    if (p.sexo === 'feminino') {
                        count.feminino++;
                      } else if (p.sexo === 'masculino') {
                        count.masculino++;
                      } else if (p.sexo === 'outro') {
                        count.outro++;
                      }
                });
                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
                res.end(pages.genSexoPage(count ,d))
            }).catch(erro => {
                console.log("Erro: "+ erro)
                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
                res.end("<p>ERRO:" + erro+"</p>")
            })}
    else if (req.url == "/desporto"){
        console.log("/desporto")
        axios.get("http://localhost:3000/pessoas").then(resp => {
            var desporto = {}
            var pessoas = resp.data
            pessoas.forEach(p => {
                desportos= p.desportos
                desportos.forEach(des =>{
                    if (des in desporto) {
                        desporto[des]++;
                    } else {
                        desporto[des] = 1;
                    }  
                })
            });
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end(pages.genSportPage(desporto ,d))
        }).catch(erro => {
            console.log("Erro: "+ erro)
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end("<p>ERRO:" + erro+"</p>")
    })}
    else if (req.url == "/top10"){
        axios.get("http://localhost:3000/pessoas").then(resp => {
            var prof = {}
            var pessoas = resp.data
            console.log("top10/")
            pessoas.forEach(p => {
                if (p.profissao in prof) {
                    prof[p.profissao]++;
                } else {
                    prof[p.profissao] = 1;
                }  
            })
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end(pages.genTop10Page(prof ,d))
        })
        .catch(erro => {
            console.log("Erro: "+ erro)
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end("<p>ERRO:" + erro+"</p>")
    })}
    else if (req.url.match(/w3.css$/)){
                console.log("CSS FILE:")
                fs.readFile('w3.css', function(err,data){
                    res.writeHead(200,{'Content-Type':'text/css; charset=utf-8'});
                    if (err){
                        res.write("Erro na leitura do ficheiro: "+ err)
                    }
                    else res.write(data)
                    res.end()})        
                }
    else if(req.url.match(/\/top10\/[a-zA-Z]+/)){
            console.log("/top10/letras")
            axios.get("http://localhost:3000/pessoas?profissao="+ req.url.substring(7)).then(resp => {
                var pessoa = resp.data
                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
                res.end(pages.genMainPage(pessoa,d))
            })
            .catch(erro => {
                console.log("Erro: "+ erro)
                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
                res.end("<p>ERRO:" + erro+"</p>")
    })}   
    else if(req.url.match(/\/desporto\/[a-zA-Z]+/)){
            console.log("/desporto/letras")
            axios.get("http://localhost:3000/pessoas?desportos_like="+ req.url.substring(10)).then(resp => {
                var pessoa = resp.data
                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
                res.end(pages.genMainPage(pessoa,d))
            })
            .catch(erro => {
                console.log("Erro: "+ erro)
                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
                res.end("<p>ERRO:" + erro+"</p>")
    })}              
    else if(req.url.match(/\/sexo\/[a-zA-Z]+/)){
                    console.log("/sexo/letras")
                    axios.get("http://localhost:3000/pessoas?sexo="+ req.url.substring(6)).then(resp => {
                        var pessoa = resp.data
                        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
                        res.end(pages.genMainPage(pessoa,d))
                    })
                    .catch(erro => {
                        console.log("Erro: "+ erro)
                        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
                        res.end("<p>ERRO:" + erro+"</p>")
                })}  
    else if(req.url.match(/\/pessoas\/\w+/)){
        console.log("pessoa/id")
        axios.get("http://localhost:3000/pessoas/"+ req.url.substring(9)).then(resp => {
            var pessoa = resp.data
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end(pages.genPessoaPage(pessoa,d))
        })
        .catch(erro => {
            console.log("Erro: "+ erro)
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
            res.end("<p>ERRO:" + erro+"</p>")
        })}
    else{
        console.log("ELSE")
        res.writeHead(405,{'Content-Type':'text/css; charset=utf-8'})
        res.end("<p>ERRO: OPERAÇÃO NÃO SUPORTADA</p>")
    }
   
}).listen(7777);

console.log("Servidor à escuta na porta 7777...")
