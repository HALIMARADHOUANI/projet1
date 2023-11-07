const express = require('express')
const route = express.Router()
const db = require('../models')
const catchAsync = require("../utils/catchAsync");

const userController = require('../controllers/userController')
route.post('/register', (req, res, next) => {
    userController.register(req.body.nom, req.body.prenom, req.body.email, req.body.password, req.body.role)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(400).json(err))
})
route.post('/forgot-password', userController.forgotPassword);
route.patch('/reset-password', userController.resetPassword);

route.post('/login', (req, res, next) => {
    console.log(req)
    userController.login(req.body.email, req.body.password)
        .then(token => res.status(200).json({token: token}))
        .catch(err => res.status(400).json({err: err}))

})
route.get('/profils', userController.profils);
route.get('/search/:queue', userController.search);
route.patch('/desactivate', userController.desactivate);
route.patch('/activate', userController.activate);


route.get('/', (req, res, next) => {
    db.User.findAll()
        .then((response) => res.status(200).send({
            length: response.length,
            data: response
        }))
        .catch((err) => res.status(400).send(err))

})
route.get('/:id', (req, res, next) => {
    db.User.findOne({where: {id: req.params.id}})
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))

})
route.patch('/:id', (req, res, next) => {
    db.User.update({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        role: req.body.role,
    }, {where: {id: req.params.id}})
        .then((response) => res.status(200).send(response))
        .catch((err) => res.status(400).send(err))

})
route.delete('/:id', (req, res, next) => {
    db.User.destroy({where: {id: req.params.id}})
        .then((response) => res.status(200).send({status:response})).catch((err) => res.status(400).send(err))
})
module.exports = route
