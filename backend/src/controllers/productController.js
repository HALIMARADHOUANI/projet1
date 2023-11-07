const factory = require('./handlerFactory')
const Produit = require('../models/Produit')
const db = require('../models')
const catchAsync = require("../utils/catchAsync");
const { Op } = require("sequelize");

exports.addProduct = catchAsync(async (req, res, next) => {
    console.log(req.body, 'req.body');
    const doc =
        db.Produit.create({
            nom: req.body.nom,
            reference: req.body.reference,
            image: req.file.originalname,
            price: req.body.price,
            CategorieId: req.body.CategorieId,
            quantity: req.body.quantity,
        }).then((response) => res.status(201).send({
            status: 'success',
            data: {
                data: response
            }
        }))
            .catch((err) => res.status(400).send(err))

})
exports.search = (req, res, next) => {
    console.log(req.params.queue)
    db.Produit.findAll({
        where: {
            [Op.or]: [
                { 'nom': { [Op.like]: '%' + req.params.queue + '%' } },
            ]
        }})
        .then((response) => res.status(200).send({
            length: response.length,
            data: response
        }))
        .catch((err) => {
                console.log(err)
                res.status(400).send(err)
            }
        )

}
