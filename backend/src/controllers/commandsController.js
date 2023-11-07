const db = require("../models");
const catchAsync = require("../utils/catchAsync");
const {response} = require("express");

exports.getMyCommands = catchAsync(async (req, res, next) => {
    db.Commande.findAll({where: {user_id: req.user.id}})
        .then((response) =>
            res.status(200).send({
                length: response.length,
                data: response
            })
        ).catch(err =>
        res.status(400).send(err)
    )
    // db.Commande.find({where: {user: req.user.id}})
    //     .then((response) => res.status(200).send({
    //         length: response.length,
    //         data: response
    //     }))
    //     .catch((err) => {
    //             console.log(err)
    //             res.status(400).send(err)
    //         }
    //     )
})
