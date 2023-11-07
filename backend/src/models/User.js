const {BOOLEAN} = require("sequelize/lib/data-types");
module.exports = (sequelize, Datatype) => {
    const User = sequelize.define("User", {
        nom: {
            type: Datatype.STRING,
            allowNull: false
        },
        prenom: {
            type: Datatype.STRING,
            allowNull: false
        },
        email: {
            type: Datatype.STRING
        },
        password: {
            type: Datatype.STRING,
            allowNull: false

        } ,
        passwordResetToken: {
            type: Datatype.STRING,
            allowNull: true

        },
        role: {
            type: Datatype.STRING,
            allowNull: false

        },
        active: {
            type: Datatype.BOOLEAN,
            default: true

        }
    })


    User.associate = models => {
        User.hasMany(models.Produit, {
            onDelete: "cascade"
        })
        User.hasMany(models.Commande, {
            onDelete: "cascade",
            foreignKey: 'user_id',
            as: 'commands'
        })
        User.hasMany(models.Publication, {
            onDelete: "cascade"
        })
        User.hasMany(models.Commentaire, {
            onDelete: "cascade"
        })
        User.hasMany(models.Facture, {
            onDelete: "cascade"
        })
        User.hasMany(models.Livraison, {
            onDelete: "cascade"
        })
        User.hasOne(models.Profil, {
            onDelete: "cascade"
        })
        User.hasOne(models.panier, {
            onDelete: "cascade"
        })


    }
    return User
}
