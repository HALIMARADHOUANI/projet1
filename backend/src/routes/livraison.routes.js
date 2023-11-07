const express = require('express')
const route = express.Router()
const db = require('../models')

route.post('/', (req, res, next) => {
    db.Livraison.create({
        UserId: req.body.userId,
        CommandeId: req.body.CommandeId,
        nom: req.body.nom,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        modePayment: req.body.modePayment,

    }).then((response) => {
        db.Facture.create({
            LivraisonId: response.id,
            UserId: req.body.userId,
        }).then((result) =>
            res.status(200).send({
                livraison: response,
                commande: result
            })
        )
    })
        .catch((err) => res.status(400).send(err))

})
route.get('/:id', (req, res, next) => {
    db.Livraison.findOne({where: {id: req.params.id}, include: [db.User]})
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))

})
route.get('', (req, res, next) => {
    db.Livraison.findAll({include: [db.User]})
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))

})
route.patch('/:id', (req, res, next) => {
    db.Livraison.update({
        nom: req.body.nom,
        UserId: req.body.UserId,

    }, {where: {id: req.param.id}})
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))

})
route.delete('/:id', (req, res, next) => {
    db.Livraison.destroy({where: {id: req}})
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))
})
module.exports = route
