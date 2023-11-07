const express = require('express')
const route = express.Router()
const db = require('../models')
const fileController = require("../controllers/fileController");
const {response} = require("express");
const {log} = require("sharp/lib/libvips");

route.post('/',
    fileController.uploadModelPhotoSingle,
    fileController.resizeModelPhoto('Publication'),
    (req, res, next) => {
        console.log(req.body)
        db.Publication.create({
            nom_pub: req.body.nom_pub,
            extension_status: req.body.extension_status,
            extension_video: req.body.extension_video,
            type: req.body.type,
            picture: req.file?.originalname || undefined,
            UserId: req.body.user,
        }).then((response) => res.status(200).send(response))
            .catch((err) => {
                console.log(err)
                res.status(400).send(err)
            })

    })

route.get('/', (req, res, next) => {
    db.Publication.findAll({
        order: [
            ["createdAt", "DESC"]
        ]
    }, {
        include: [db.User,db.Commentaire]
    })
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))

})
route.get('/:id', (req, res, next) => {
    db.Publication.findOne({where: {id: req.params.id}, include: [db.User, {
        model:db.Commentaire,
            include: [db.User]
        }]})
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))

})

route.patch('/:id', (req, res, next) => {
    db.Publication.update({
        nom_pub: req.body.nom_pub,
        extension_status: req.body.extension_status,
        extension_video: req.body.extension_video,
        type: req.body.type,
        picture: req.body.picture,
        UserId: req.body.user,
    }, {where: {id: req.param.id}})
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))

})
route.delete('/:id', (req, res, next) => {
    db.Publication.destroy({where: {id: req.params.id}})
        .then((response) =>res.status(201).send({
            status: 'success',
            data: {
                data: response
            }
        }))
        .catch((err) => res.status(400).send(err))
})
module.exports = route
