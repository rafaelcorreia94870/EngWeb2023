var Lista = require('../models/lista')

// Shop list

//"id", "nome", "data" e "resultado"
module.exports.list = () => {
    return Lista
            .find({},{id:1, nome:1, data:1, resultado:1})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.melhorlist = () => {
    return Lista
            .find({},{dataEMD:1, nome:1, género:1, idade:1,resultado:1})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getLista = id => {
    return Lista.findOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addLista = l => {
    return Lista.create(l)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateLista = l => {
    return Lista.updateOne({_id:l._id}, l)
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteLista = id => {
    return Lista.deleteOne({_id:id})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.modalidades = () => {
    return Lista.distinct("modalidade")
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.resulttrue = () => {
    return Lista.find({resultado:true})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.modalidadeX = (req) => {
    return Lista.find({modalidade:req})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}


module.exports.atletasF = (id) => {
    return Lista.find({género: "F"})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}


module.exports.clube = (club) => {
    return Lista.find({clube: club})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addProduto = (id, prod) => {
    return Lista.updateOne({_id:id}, 
                { $push: { "produtos": prod } })
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteProduto = (id, prod) => {
    return Lista.updateOne({ "_id": id }, 
                { $pull: {"produtos": {_id: prod}}})
            .then(resposta => {
                return resposta
            })
            .catch(erro => {
                return erro
            })
}