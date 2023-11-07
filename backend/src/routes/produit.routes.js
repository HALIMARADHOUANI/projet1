const express = require('express')
const route = express.Router()
const db = require('../models')
const fileController = require('./../controllers/fileController');
const productController = require('./../controllers/productController');
route.get('/', (req, res, next) => {
    db.Produit.findAll()
        .then((response) => {
            res.status(200).send(response)
        })
        .catch((err) => res.status(400).send(err))

})
route.post('/add-product',
    fileController.uploadModelPhotoSingle,
    fileController.resizeModelPhoto('Produit'),
    productController.addProduct);
route.get('/search/:queue', productController.search);


route.get('/:id', (req, res, next) => {
    db.Produit.findOne({where: {id: req.params.id}})
        .then((response) => res.status(201).send({
            status: 'success',
            data: response
        }))
        .catch((err) => res.status(400).send(err))

})
route.get('/categories/:id', (req, res, next) => {
    console.log(req.params.id)
    db.Produit.findAll({where: {CategorieId: req.params.id}})
        .then((response) => res.status(201).send(response))
        .catch((err) => res.status(400).send(err))

})
route.patch('/update-product/:id',
    fileController.uploadModelPhotoSingle,
    fileController.resizeModelPhoto('Produit'),
    (req, res, next) => {
        console.log('update', req.body)
        db.Produit.update({
            nom: req.body.nom,
            reference: req.body.reference,
            quantite: req.body.quantite,
            prix: req.body.prix,
            image: req.file?.originalname,
            UserId: req.body.UserId,

        }, {where: {id: req.params.id}})
            .then((response) => res.status(201).send({
                status: 'success',
                data: response
            })).catch((err) => res.status(400).send(err))

    })
route.delete('/delete-by-id/:id', (req, res, next) => {

    db.Produit.destroy({where: {id: req.params.id}})
        .then((response) => res.status(201).send({
            status: 'success',
            data: response
        }))
        .catch((err) => res.sendStatus(400).send(err))
})
module.exports = route
