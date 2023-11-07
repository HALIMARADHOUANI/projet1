module.exports = (sequelize, Datatype) => {
    const itempanier = sequelize.define("itemPanier", {
      quantity: {
        type: Datatype.INTEGER,
      },
      price: {
        type: Datatype.INTEGER,
      },
      Idproduit: {
        type: Datatype.INTEGER,
      }
    });
  
    itempanier.associate=models=>{
        itempanier.belongsTo(models.panier,{
            onDelete:"cascade"
        })
    }
    return itempanier;
  }
