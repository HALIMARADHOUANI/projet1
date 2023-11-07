const Joi = require('joi')
const bcrypt = require('bcrypt')
const db = require('../models')
const jwt = require('jsonwebtoken')
const catchAsync = require("../utils/catchAsync");
const {promisify} = require('util');
const Email = require('./../utils/email');
const AppError = require('./../utils/appError');
const { Op } = require("sequelize");

const SchemmaValidation = Joi.object({
    nom: Joi.string().required(),
    prenom: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().required(),
})
exports.register = (nom, prenom, email, password, role) => {
    return new Promise((resolve, reject) => {
        let validation = SchemmaValidation.validate({
            nom: nom,
            prenom: prenom,
            email: email,
            password: password,
            role: role
        })
        if (validation.error) {
            reject(validation.error.details[0].message)
        }
        db.User.count({where: {email: email}}).then(doc => {
            if (doc != 0) {
                reject("this email is used")
            }
            {
                bcrypt.hash(password, 10).then(hashedPassword => {
                    db.User.create({
                        nom: nom,
                        prenom: prenom,
                        email: email,
                        password: hashedPassword,
                        role: role,

                    }).then((response) => resolve(response))
                        .catch((err) => reject(err))
                })
            }
        })


    })
}
let JWT_SECRET = "my-ultra-secure-and-ultra-long-secret"
exports.login = (email, password) => {
    return new Promise((resolve, reject) => {

        db.User.findOne({where: {email: email}}).then(user => {
            if (!user) {
                reject("invalid email and password")
            } else if (!user.active) {
                resolve("Votre compte est bloqué");
            } else {
                bcrypt.compare(password, user.password).then(same => {
                    if (same) {
                        let token = jwt.sign({id: user.id, nom: user.nom, role: user.role}, process.env.JWT_SECRET, {
                            expiresIn: "24h"
                        })
                        resolve(token)
                    } else {
                        reject("invalid email and password")
                    }
                })
            }
        })


    })
}


exports.profils = (req, res, next) => {
    db.User.findAll({
        where: {
            role: 'client'
        }
    })
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
exports.search = (req, res, next) => {
    console.log(req.params)
    db.User.findAll({
        where: {
            [Op.or]: [
            { 'nom': { [Op.like]: '%' + req.params.queue + '%' } },
            { 'email': { [Op.like]: '%' + req.params.queue + '%' } },
            { 'prenom': { [Op.like]: '%' + req.params.queue + '%' } },
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
exports.desactivate = (req, res, next) => {
    console.log(req.body)
    db.User.update(
        {
            active: false,
        }, {
            where: {id: req.body.id}
        }
    )
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
exports.activate = (req, res, next) => {
    console.log(req.body)
    db.User.update(
        {
            active: true,
        }, {
            where: {id: req.body.id}
        }
    )
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


exports.protect = catchAsync(async (req, res, next) => {
    // 1) Getting token and check of it's there
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        return next(
            new AppError('You are not logged in! Please log in to get access.', 401)
        );
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    let currentUser
    db.User.findOne({where: {id: decoded.id}}).then((response) => {
        currentUser = response
        // 3) Check if user still exists
        if (!currentUser) {
            return next(
                new AppError(
                    'The user belonging to this token does no longer exist.',
                    401
                )
            );
        }
        req.user = currentUser;
        res.locals.user = currentUser;
        next();
    })


    // GRANT ACCESS TO PROTECTED ROUTE

});


exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on POSTed email
    await db.User.findOne(
        {
            where: {
                email: req.body.email
            }
        }).then(async (user) => {
        if (!user) {
            return next(new AppError('There is no user with email address.', 404));
        }
        // 2) Generate the random reset token
        const resetToken = jwt.sign({id: user.id, nom: user.nom, role: user.role}, process.env.JWT_SECRET, {
            expiresIn: "24h"
        })
        db.User.update({
            passwordResetToken: resetToken,
        }, {where: {id: user.id}})
            .then((response) => {
                console.log(response)
            })

        // 3) Send it to user's email
        try {
            console.log(req.headers.origin)
            const resetURL = `${req.headers.origin}/reset-password/${resetToken}`;
            console.log(resetURL)
            await new Email(user, resetURL).sendPasswordReset();
            res.status(200).json({
                status: 'success',
                message: 'Token sent to email!'
            });
        } catch (err) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({validateBeforeSave: false});

            return next(
                new AppError('There was an error sending the email. Try again later!', err),
                500
            );
        }
    });

});
const signToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "24h"
    });
};
exports.resetPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on the token
    console.log(req.body)
    db.User.findOne({
        where: {
            passwordResetToken: req.body.code
        }
    }).then((user) => {

        console.log(user)
        // 2) If token has not expired, and there is user, set the new password
        if (!user) {
            return next(new AppError('Token is invalid or has expired', 400));
        }
        bcrypt.hash(req.body.password, 10).then(hashedPassword => {

            db.User.update({
                password: hashedPassword,
                passwordResetToken: undefined,
            }, {where: {id: user.id}})
                .then((response) => {
                    console.log(response)
                })
            createSendToken(user, 200, req, res);

        })
    })

    // 3) Update changedPasswordAt property for the user
    // 4) Log the user in, send JWT
});
const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);



    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};
