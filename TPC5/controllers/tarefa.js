var axios = require('axios')

// Student list
module.exports.toDo = () => {
    return axios.get('http://localhost:3000/tarefas?done=False')
            .then(resposta => {
                return resposta.data
            })
            .catch(erro =>{
                return erro
            })
}

module.exports.Done = () => {
    return axios.get('http://localhost:3000/tarefas?done=True')
            .then(resposta => {
                return resposta.data
            })
            .catch(erro =>{
                return erro
            })
}

module.exports.getTarefa = (id) => {
    return axios.get('http://localhost:3000/tarefas/'+id)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro =>{
                return erro
            })
}

module.exports.addTarefa = (tarefa) => {
    return axios.post('http://localhost:3000/tarefas/', tarefa)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro =>{
                return erro
            })
}

module.exports.editTarefa = (tarefa) => {
    return axios.put('http://localhost:3000/tarefas/'+tarefa.id, tarefa)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro =>{
                return erro
            })
}