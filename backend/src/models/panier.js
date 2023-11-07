module.exports = (sequelize, Datatype) => {
    const panier = sequelize.define("panier", {
        prixTotal: {
            type: Datatype.INTEGER,
            allowNull: false
        },
    });
    panier.associate = models => {
        panier.hasMany(models.itemPanier, {
            foreignKey:'itemPanier_id',
            onDelete: "cascade"
        })

    }
    panier.associate = models => {
        panier.belongsTo(models.User, {
            onDelete: "cascade"
        })
    }

    return panier;
}
