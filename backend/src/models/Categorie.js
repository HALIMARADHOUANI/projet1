
module.exports = (sequelize, Datatype) => {
  const Categorie= sequelize.define("Categorie",{
    nom:{
      type:Datatype.STRING,
      allowNull:false
    },


  })
  Categorie.associate=models=>{
    Categorie.hasMany(models. Produit,{
        onDelete:"cascade"
    })
            }
    
            return Categorie
        
    }