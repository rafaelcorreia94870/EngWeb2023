//mypages.js
//2023-03-01: by me

//mypages.js
//2023-03-01: by me

exports.genTop10Page= function(prof,data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Person Page</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-deep-purple">
                    <h1>TOP 10 PROFISSÕES</h1>
                </header>
            <table class="w3-table-all w3-hoverable" ">
            <tr class="w3-hover-deep-purple">
                <th class="w3-hover-pink"> <a href="http://localhost:7777/pessoas">Página Inicial</a></th>
                <th class="w3-hover-pink"><a href="http://localhost:7777/sexo">Distribuição por sexo</a></th>
                <th class="w3-hover-pink"><a href="http://localhost:7777/desporto">Distribuiçaõ por desporto</a></th>
                <th class="w3-hover-pink"><a href="http://localhost:7777/top10">Top 10 profissões</a></th>
            </tr>
            </table>
                <div class="container">
                `
    const top = Object.keys(prof)
    .sort((a, b) => prof[b] - prof[a])
    .slice(0, 10);
    for(let i=0; i<top.length;i++){
        pagHTML+=`
        <p>${i+1}: ${top[i]} <a href="http://localhost:7777/top10/${top[i]}">${prof[top[i]]}</a></p>
        `
    }

    pagHTML+= `
                </div>
                
                <footer class="w3-container w3-deep-purple">
                    <h5>Generated in EngWeb2023 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
                `
    return pagHTML
}

exports.genSportPage= function(desporto,data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Person Page</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-deep-purple">
                    <h1>Distribuição por Desportos</h1>
                </header>
            <table class="w3-table-all w3-hoverable" ">
            <tr class="w3-hover-deep-purple">
                <th class="w3-hover-pink"> <a href="http://localhost:7777/pessoas">Página Inicial</a></th>
                <th class="w3-hover-pink"><a href="http://localhost:7777/sexo">Distribuição por sexo</a></th>
                <th class="w3-hover-pink"><a href="http://localhost:7777/desporto">Distribuiçaõ por desporto</a></th>
                <th class="w3-hover-pink"><a href="http://localhost:7777/top10">Top 10 profissões</a></th>
            </tr>
            </table>
                <div class="container">
                `
    Object.keys(desporto).forEach(key => {
        pagHTML+=`
        <p>${key}: <a href="http://localhost:7777/desporto/${key}">${desporto[key]}</a></p>
        `
    });

    pagHTML+= `
                </div>
                
                <footer class="w3-container w3-deep-purple">
                    <h5>Generated in EngWeb2023 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
                `
    return pagHTML
}    

exports.genSexoPage = function(count, data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Person Page</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-deep-purple">
                    <h1>Distribuição por sexo</h1>
                </header>
            <table class="w3-table-all w3-hoverable" ">
            <tr class="w3-hover-deep-purple">
                <th class="w3-hover-pink"> <a href="http://localhost:7777/pessoas">Página Inicial</a></th>
                <th class="w3-hover-pink"><a href="http://localhost:7777/sexo">Distribuição por sexo</a></th>
                <th class="w3-hover-pink"><a href="http://localhost:7777/desporto">Distribuiçaõ por desporto</a></th>
                <th class="w3-hover-pink"><a href="http://localhost:7777/top10">Top 10 profissões</a></th>
            </tr>
            </table>
                <div class="container">
                    <p>Masculino: <a href="http://localhost:7777/sexo/masculino">${count.masculino}</a></p>
                    <p>Feminino : <a href="http://localhost:7777/sexo/feminino">${count.feminino}</a></p>
                    <p>Outro: <a href="http://localhost:7777/sexo/outro">${count.outro}</a></p>
                </div>
                
                <footer class="w3-container w3-deep-purple">
                    <h5>Generated in EngWeb2023 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
                `
    return pagHTML
}

exports.genPessoaPage = function(pessoa,data){
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Person Page</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-deep-purple">
                    <h1>${pessoa.nome}</h1>
                </header>
            <table class="w3-table-all w3-hoverable" ">
            <tr class="w3-hover-deep-purple">
                <th class="w3-hover-pink"> <a href="http://localhost:7777/pessoas">Página Inicial</a></th>
                <th class="w3-hover-pink"><a href="http://localhost:7777/sexo">Distribuição por sexo</a></th>
                <th class="w3-hover-pink"><a href="http://localhost:7777/desporto">Distribuiçaõ por desporto</a></th>
                <th class="w3-hover-pink"><a href="http://localhost:7777/top10">Top 10 profissões</a></th>
            </tr>
            </table>
                <div class="container">
                    <p>Idade : ${pessoa.idade}</p>
                    <p>Sexo : ${pessoa.sexo}</p>
                    <p>Cidade : ${pessoa.morada.cidade}</p>

                </div>
                
                <footer class="w3-container w3-deep-purple">
                    <h5>Generated in EngWeb2023 ${data}</h5>
                </footer>
            </div>
        </body>
    </html>
                `
    return pagHTML
}


exports.genMainPage = function(lista,data){
    var pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <title>About people...</title>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
    <div class="we-card-4">
        <header class= "w3-container w3-deep-purple">
            <h1>Lista de Pessoas na Base de Dados (${lista.length})</h1>
        </header>
        <table class="w3-table-all w3-hoverable" ">
            <tr class="w3-hover-deep-purple">
                <th class="w3-hover-pink"> <a href="http://localhost:7777/pessoas">Página Inicial</a></th>
                <th class="w3-hover-pink"><a href="http://localhost:7777/sexo">Distribuição por sexo</a></th>
                <th class="w3-hover-pink"><a href="http://localhost:7777/desporto">Distribuiçaõ por desporto</a></th>
                <th class="w3-hover-pink"><a href="http://localhost:7777/top10">Top 10 profissões</a></th>
            </tr>
            <tr class="w3-hover-pink">
                <th>Id</th>
                <th>Nome</th>
                <th>Idade</th>
                <th>Sexo</th>
                <th>Cidade</th>
            </tr>`

    for(let i=0; i< lista.length;i++){
        pagHTML+=`
        <tr class="w3-hover-pink">
        <td>${lista[i].id}</td>
        <td>
            <a href="http://localhost:7777/pessoas/${lista[i].id}">
                ${lista[i].nome}
            </a> 
            </td>
            <td>${lista[i].idade}</td>
            <td>${lista[i].sexo}</td>
            <td>${lista[i].morada.cidade}</td>
        </tr>
        `
    }
            
    pagHTML +=`
        </table>
        <div>
            <p>Lorem ipsum...</h>
        </div>
        <footer class="w3-container w3-deep-purple">
            <h5> Generated by pessoas-server : ${data}</h5>
        </footer>
    </div>

    </body>
</html>
    `
    return pagHTML
}