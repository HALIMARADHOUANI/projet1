const express = require('express')
const route = express.Router()
const db = require('../models')
const authController = require('../controllers/userController')
const commandsController = require('../controllers/commandsController')

route.post('/', (req, res, next) => {
    console.log(req.body)
    let panier = db.panier.create({
        prixTotal: req.body.prixTotal,
        UserId: req.body.user,
        itemPanier: req.body.itempanier,
    }).then(result => {
            for (let i = 0; i < req.body.itempanier.length; i++) {

                var itemPanier = db.itemPanier.create({
                    panierId: result.get('id'),
                    Idproduit: req.body.itempanier[i].productId
                });
            }
            db.Commande.create({
                panierId: result.id,
                user_id: req.body.user,
                dateCommande: Date.now(),
                prixTotal: req.body.prixTotal,
                etatCommande: 'PENDING',
                modePayment: 'carte',
            }).then((response) => res.status(200).send({status: response}))
                .catch((err) => err)

        }
    );


})

route.get('/', (req, res, next) => {
    db.Commande.findAll({
        raw: true,
        include: [
            {model: db.panier, include: [db.User]}
        ]
    })
        .then((response) => res.status(200).send(response))
        .catch((err) => {
            console.log(err)
            res.status(400).send(err)
        })

})
route.get('/my-commands', authController.protect, commandsController.getMyCommands)
route.get('/:id', (req, res, next) => {
    db.Commande.findOne({where: {id: req.params.id}})
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))

})

route.patch('/accept', (req, res, next) => {
    console.log(req.body)
    db.Commande.update({
        etatCommande: 'ACCEPTED',

    }, {where: {id: req.body.id}})
        .then((response) => res.status(200).send({status: 'success'}))
        .catch((err) => res.status(400).send(err))

})
route.patch('/refuse', (req, res, next) => {
    db.Commande.update({
        etatCommande: 'REFUSED',
    }, {where: {id: req.body.id}})
        .then((response) => res.status(200).send({status: 'success'}))
        .catch((err) => res.status(400).send(err))

})
route.patch('/:id', (req, res, next) => {
    db.Commande.update({
        nom: req.body.nom,
        description: req.body.description,
        quantite: req.body.quantite,
        prix: req.body.prix,
        UserId: req.body.UserId,

    }, {where: {id: req.param.id}})
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))

})

route.delete('/:id', (req, res, next) => {
    db.Commande.destroy({where: {id: req}})
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))
})
module.exports = route
