// alunos_server.js
// RPCW2023: 2023-03-05
// by jcr

var http = require('http')
var axios = require('axios')
var templates = require('./templates')
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

var alunosServer = http.createServer(function (req, res) {
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
                if((req.url == "/") || (req.url == "/alunos")){
                    axios.get("http://localhost:3000/alunos?_sort=nome")
                        .then(response => {
                            var alunos = response.data
                            // Render page with the student's list
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.studentsListPage(alunos, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de alunos... Erro: " + erro)
                            res.end()
                        })
                }
                // GET /alunos/:id --------------------------------------------------------------------
                else if(/\/alunos\/(A|PG)[0-9]+$/i.test(req.url)){
                    var idAluno = req.url.split("/")[2]
                    axios.get("http://localhost:3000/alunos/" + idAluno)
                        .then( response => {
                            let a = response.data
                            // Add code to render page with the student record
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.studentPage(a, d))
                        })
                }
                // GET /alunos/registo --------------------------------------------------------------------
                else if(req.url == "/alunos/registo"){
                    // Add code to render page with the student form
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write(templates.studentFormPage(d))
                    res.end()
                }
                // GET /alunos/edit --------------------------------------------------------------------
                else if(/\/alunos\/edit\/(A|PG)[0-9]+$/i.test(req.url)){
                    // Get aluno record
                    var idAluno = req.url.split("/")[3]
                    axios.get("http://localhost:3000/alunos/" + idAluno)
                    .then( response => {
                        axios.get("http://localhost:3000/alunos?_sort=nome")
                        .then(response => {
                            var alunos = response.data
                            // Render page with the student's list
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.studentsListPage(alunos, d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de alunos... Erro: " + erro)
                            res.end()
                        })
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(`<p>Não foi possível obter o registo do aluno ${idAluno}... Erro</p>`)
                        res.end()
                    })
                }
                else if(/\/alunos\/delete\/(A|PG)[0-9]+$/i.test(req.url)){
                    // Get aluno record
                    var idAluno = req.url.split("/")[3]
                    axios.get("http://localhost:3000/alunos/" + idAluno)
                    .then( response => {
                    axios.delete("http://localhost:3000/alunos/"+idAluno)
                        .then( response => {
                            axios.get("http://localhost:3000/alunos?_sort=nome")
                            .then(response => {
                                var alunos = response.data
                                // Render page with the student's list
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(templates.studentsListPage(alunos, d))
                                res.end()
                            })
                            .catch(function(erro){
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Não foi possível obter a lista de alunos... Erro: " + erro)
                                res.end()
                            })
                        })
                    .catch(erro => {
                        console.log("Erro: "+ erro)
                    })
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(`<p>Não foi possível obter o registo do aluno ${idAluno}... Erro</p>`)
                        res.end()
                    })
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                    res.end()
                }
                break
        case "POST":
            if(req.url == '/alunos/registo'){
                collectRequestBodyData(req, result => {
                    if(result){
                        axios.post("http://localhost:3000/alunos/",result)
                            .then( response => {
                                let aluno = response.data
                                console.log(aluno)
                                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(templates.studentPostConfirmPage(aluno, d))
                                res.end()
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
            else if(/\/alunos\/edit\/(A|PG)[0-9]+$/i.test(req.url)){
                    collectRequestBodyData(req, result => {
                        var idAluno = req.url.split("/")[3]
                        if(result){
                            axios.put("http://localhost:3000/alunos/"+idAluno,result)
                                .then( response => {
                                    let aluno = response.data
                                    res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write(templates.studentPostConfirmPage(aluno, d))
                                    res.end()
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
                    });            
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

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



