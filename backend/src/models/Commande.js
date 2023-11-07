module.exports = (sequelize, Datatype) => {
    const Commande = sequelize.define("Commande", {
        dateCommande: {
            type: Datatype.STRING,
        },
        prixTotal: {
            type: Datatype.INTEGER,
        },
        etatCommande: {
            type: Datatype.STRING,
        },
        modePayment: {
            type: Datatype.STRING,
        },

        role: {
            type: Datatype.STRING,
            defaultValue: "client"
        }
    });

    Commande.associate = models => {
        Commande.belongsTo(models.User, {
            onDelete: "cascade",
            foreignKey: {
                name: 'user_id',
                allowNull: false
            },
            as: 'users',
        })
    }
    Commande.associate = models => {
        Commande.belongsTo(models.panier, {
            onDelete: "cascade",
            foreignKey: {
                allowNull: false
            },
        })


    }
    return Commande;
}
