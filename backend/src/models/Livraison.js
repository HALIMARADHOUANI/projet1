module.exports = (sequelize, Datatype) => {
    const Livraison = sequelize.define("Livraison", {
        nom: {
            type: Datatype.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: Datatype.INTEGER,
            allowNull: false
        },
        address: {
            type: Datatype.STRING,
            allowNull: false
        },
        modePayment: {
            type: Datatype.STRING,
        }
    });
    Livraison.associate = models => {
        Livraison.belongsTo(models.User, {
            onDelete: "cascade"
        })
    }
    Livraison.associate = models => {
        Livraison.belongsTo(models.Commande, {
            onDelete: "cascade"
        })
    }

    return Livraison

}
