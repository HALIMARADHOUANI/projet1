const express = require('express')
const route = express.Router()
const db = require('../models')

route.post('/', (req, res, next) => {
    db.Facture.create({
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        telephone: req.body.telephone,
        UserId: req.body.UserId,

    }).then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))

})
route.get('/:id', (req, res, next) => {
    db.Facture.findOne({
        where: {id: req.params.id},  include: { all: true, nested: true }
    })
        .then((response) => res.status(200).send(response))
        .catch((err) => {
            console.log(err)
            res.status(400).send(err)
        })

})
route.get('/', (req, res, next) => {
    db.Facture.findAll({include: [db.User]})
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))

})
route.patch('/:id', (req, res, next) => {
    db.Facture.update({
        nom: req.body.nom,
        prenom: req.body.prenom,
        adresse: req.body.adresse,
        telephone: req.body.telephone,

    }, {where: {id: req.param.id}})
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))

})
route.delete('/:id', (req, res, next) => {
    db.Facture.destroy({where: {id: req}})
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))
})
module.exports = route
