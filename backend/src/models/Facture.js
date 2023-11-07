module.exports = (sequelize, Datatype) => {
    const Facture = sequelize.define("Facture", {

    })
    Facture.associate = models => {
        Facture.belongsTo(models.User, {
            onDelete: "cascade"
        })
    }
    Facture.associate = models => {
        Facture.belongsTo(models.Livraison, {
            onDelete: "cascade"
        })
    }

    return Facture

}
