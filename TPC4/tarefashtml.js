exports.tarefaPage = function(tarefas, editID){
    var tarefasToDo = []
    var tarefasDone = []
    for(let i=0; i<tarefas.length;i++){
        if(tarefas[i].done=="True"){
            tarefasDone.push(tarefas[i])
        }
        else{
            tarefasToDo.push(tarefas[i])
        }
    }
    if(!editID){
    pagHTML = `
    <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <link rel="icon" href="porreiro.jpg"/>
        <link rel="stylesheet" href="public/w3.css"/>
        <title>Tarefas</title>
    </head>
    <body class="w3-light-grey">
        <div class ="header w3-padding-16 w3-card">
            <div class="w3-margin">
                <h1>Introduza dados</h1>
            </div>
            <div clas="container">
                <form class="w3-container" method="POST">
                    <fieldset>
                        <legend>Tarefa</legend>
                        <div style="display: flex;">
                            <label class="w3-padding">  Nome  </label>
                            <input class="w3-input w3-round" type="text" name="nome">
                            <label class="w3-padding">  Data Limite  </label>
                            <input class="w3-input w3-round" type="text" name="data">
                            <label class="w3-padding">  Quem a Faz  </label>
                            <input class="w3-input w3-round" type="text" name="pessoa">
                        </div>
                        <div>
                            <label>Descrição</label>
                            <input class="w3-input w3-round" type="text" name="des">
                        </div>
                    
                    </fieldset>
                    <div class="w3-padding-small w3-right w3-left-margin">
                        <button class="w3-btn w3-teal w3-mb-2 w3-round-large" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="w3-row-padding  w3-padding w3-card-4" name="content">   
            <div name="to-do" class="w3-half w3-center w3-card w3-row-padding">
                <h1>TAREFAS A REALIZAR</h1>
                <div>
                    <table class="w3-table-all">
                        <tr>
                            <td>
                                Nome
                            </td>
                            <td>
                                Até
                            </td>
                            <td>
                                Quem
                            </td>
                            <td>
                                Info
                            </td>
                        </tr>
    `
}
else{
    pagHTML = `
    <!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <link rel="icon" href="porreiro.jpg"/>
        <link rel="stylesheet" href="public/w3.css"/>
        <title>Tarefas</title>
    </head>
    <body class="w3-light-grey">
        <div class ="header w3-padding-16 w3-card">
            <div class="w3-margin">
                <h1>Introduza dados</h1>
            </div>
            <div clas="container">
                <form class="w3-container" method="POST">

                    <fieldset>
                        <legend>Tarefa</legend>
                        <div style="display: flex;">
                            <label class="w3-padding">  Nome  </label>
                            <input class="w3-input w3-round" type="text" name="nome">
                        <label class="w3-padding">  Data Limite  </label>
                        <input class="w3-input w3-round" type="text" name="data">
                        <label class="w3-padding">  Quem a Faz  </label>
                        <input class="w3-input w3-round" type="text" name="pessoa">
                    </div>
                    <div>
                        <label>Descrição</label>
                        <input class="w3-input w3-round" type="text" name="des">
                    </div>
                    
                </fieldset>
                <div class="w3-padding-small w3-right w3-left-margin">
                    <button class="w3-btn w3-teal w3-mb-2 w3-round-large" type="submit">Submit</button>
                </div>
            </form>
            </div>
        </div>
        <div class="w3-row-padding  w3-padding w3-card-4" name="content">   
            <div name="to-do" class="w3-half w3-center w3-card w3-row-padding">
                <h1>TAREFAS A REALIZAR</h1>
                <div>
                    <table class="w3-table-all">
                        <tr>
                            <td>
                                Nome
                            </td>
                            <td>
                                Até
                            </td>
                            <td>
                                Quem
                            </td>
                            <td>
                                Info
                            </td>
                        </tr>
    `

}
    for(let i=0; i< tarefasToDo.length;i++){
            if(editID==tarefasToDo[i].id){
                pagHTML+=`
                <form class="w3-container" method="POST">
                <fieldset>
                <tr>
                <td class="editable" contenteditable="true">
                    <input maxlength="10" value="${tarefasToDo[i].nome}" size="12%" name="nome" type="text"></input>
                </td>
                <td class="editable" contenteditable="true">
                    <input value="${tarefasToDo[i].data}" size="12%" name="data" type="text"></input>
                </td>
                <td class="editable" contenteditable="true">
                    <input value="${tarefasToDo[i].pessoa}" size="12%" name="pessoa" type="text"></input>
                </td>
                <td class="editable" contenteditable="true">
                    <input value="${tarefasToDo[i].des}" size="12%" name="des" type="text"></input>
                </td>
                </fieldset>
                <td>
                    <div class="w3-padding-small w3-right w3-left-margin">
                        <button class="w3-btn w3-teal w3-mb-2 w3-round-large w3-mar" type="submit">Save</button>
                    </div>
                    <div class="w3-padding-small w3-right w3-left-margin">                            
                        <button class="w3-btn w3-teal w3-mb-2 w3-round-large" type="submit"><a style="text-decoration:none;" href="/tarefas/done/${tarefasToDo[i].id}">Done</a></button>
                    </div>

                    </div>
                </td>
            </tr>    
            </form>

                `
        }
        else{
        pagHTML+=`
        <tr>
                            <td class="editable" contenteditable="false">
                                ${tarefasToDo[i].nome}
                            </td>
                            <td class="editable" contenteditable="false">
                                ${tarefasToDo[i].data}
                            </td>
                            <td class="editable" contenteditable="false">
                                ${tarefasToDo[i].pessoa}
                            </td>
                            <td class="editable" contenteditable="false">
                                ${tarefasToDo[i].des}
                            </td>
                            <td>
                                <div class="w3-padding-small w3-right w3-left-margin">
                                    <button class="w3-btn w3-teal w3-mb-2 w3-round-large w3-mar" type="button"><a style="text-decoration:none;" href="/tarefas/edit/${tarefasToDo[i].id}">Edit</a></button>
                                </div>
                                <div class="w3-padding-small w3-right w3-left-margin">                            
                                    <button class="w3-btn w3-teal w3-mb-2 w3-round-large" type="submit"><a style="text-decoration:none;" href="/tarefas/done/${tarefasToDo[i].id}">Done</a></button>
                                </div>

                                </div>
                            </td>
                        </tr>    
        `
        }
    }

    pagHTML+=`
    </table>
    </div>
    </div>
    <div name="done" class="w3-half w3-center w3-card w3-row-padding">
                <h1>TAREFAS REALIZADAS</h1>
                <table class="w3-table-all">
                    <tr>
                        <td>
                            Nome
                        </td>
                        <td>
                            Até
                        </td>
                        <td>
                            Quem
                        </td>
                        <td>
                            Info
                        </td>
                    </tr>
    `
    for(let j=0; j<tarefasDone.length;j++){
        pagHTML+=`
        <tr>
        <td>
            ${tarefasDone[j].nome}
        </td>
        <td>
            ${tarefasDone[j].data}
        </td>
        <td>
            ${tarefasDone[j].pessoa}
        </td>
        <td>
            ${tarefasDone[j].des}
        </td>
    </tr>
        `
    }

    return pagHTML
}