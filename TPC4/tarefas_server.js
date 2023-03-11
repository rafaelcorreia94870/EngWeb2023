// alunos_server.js
// RPCW2023: 2023-03-05
// by jcr

var http = require('http')
var axios = require('axios')
var tarefashtml = require('./tarefashtml.js')
var static = require('./static.js')
const { parse, stringify } = require('querystring');


function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server creation

var tarefasServer = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /alunos --------------------------------------------------------------------
                if((req.url == "/") || (req.url == "/tarefas")){
                    axios.get("http://localhost:3000/tarefas")
                        .then(response => {
                            var tarefas = response.data
                            
                            // Render page with the student's list
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(tarefashtml.tarefaPage(tarefas, null))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de alunos... Erro: " + erro)
                            res.end()
                        })
                }
                else if(/\/tarefas\/done\/.+$/i.test(req.url)){
                    var idTarefa = req.url.split("/")[3]
                    axios.get("http://localhost:3000/tarefas/"+ idTarefa).then(response =>{
                        tarefa=response.data
                        tarefa.done="True"
                        axios.put("http://localhost:3000/tarefas/"+ idTarefa, tarefa).then(response2 =>{
                            axios.get("http://localhost:3000/tarefas").then(response3 =>{
                                var tarefas=response3.data
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(tarefashtml.tarefaPage(tarefas,null))
                                res.end()
                            })
                        })
    
                    })
                }
                else if(/\/tarefas\/edit\/.+$/i.test(req.url)){
                    var idTarefa = req.url.split("/")[3]
                    axios.get("http://localhost:3000/tarefas/").then(response =>{
                        var tarefas=response.data
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(tarefashtml.tarefaPage(tarefas, idTarefa))
                        res.end()
                })
                }
                else if(/\/tarefas\/save\/.+$/i.test(req.url)){
                    var idTarefa = req.url.split("/")[3]
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.get("http://localhost:300/tarefas/"+idTarefa).then(response =>{
                                var tarefacompleta=response.data
                                result.id=tarefacompleta.id
                                result.done=tarefacompleta.done
                                
                                axios.put("http://localhost:3000/tarefas/"+idTarefa,result)
                                .then( response =>{
                                    axios.get("http://localhost:3000/tarefas/").then(response3 =>{
                                        var tarefas=response.data
                                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                        res.write(tarefashtml.tarefaPage(tarefas, null))
                                        res.end()
                                    }).catch(err =>{
                                        console.log("errooo: "+ err)
                                    })
                                }).catch(erro =>{
                                    console.log("ERRRRRRROOOO:::"+erro)
                                })
                        })
                    }
                })
            }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                    res.end()
                }
                break
        case "POST":
            if(req.url == '/'){
                collectRequestBodyData(req, result => {
                    if(result){
                        result.done="False"
                        axios.post("http://localhost:3000/tarefas/",result)
                            .then( response => {
                                axios.get("http://localhost:3000/tarefas").then(response2 =>{
                                    var tarefas = response2.data
                                    res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write(tarefashtml.tarefaPage(tarefas,null))
                                    res.end()
                                }).catch(erro => {
                                    console.log("Erro2: "+ erro)
                                })
                            })
                            .catch(erro => {
                                console.log("Erro: "+ erro)
                            })
                    }
                    else{
                        res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write("<p>Unable to collect data from body...</p>")
                        res.end()
                    }
                })}
                else if(/\/tarefas\/edit\/.+$/i.test(req.url)){
                    var idTarefa = req.url.split("/")[3]
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.get("http://localhost:3000/tarefas/"+idTarefa).then(response =>{
                                var tarefacompleta=response.data
                                result.id=tarefacompleta.id
                                result.done=tarefacompleta.done
                                
                                axios.put("http://localhost:3000/tarefas/"+idTarefa,result)
                                .then( response =>{
                                    axios.get("http://localhost:3000/tarefas/").then(response3 =>{
                                        var tarefas=response3.data
                                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                        res.write(tarefashtml.tarefaPage(tarefas, null))
                                        res.end()
                                    }).catch(erro => {
                                        console.log("Erro Post GET dentro: "+ erro)
                                    })
                                }).catch(erro => {
                                    console.log("Erro Post Put: "+ erro)
                                })
                        }).catch(erro => {
                            console.log("Erro Post GET: "+ erro)
                        })
                    }
                })
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                res.write('<p><a href="/">Return</a></p>')
                res.end()
            }
            break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

tarefasServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



