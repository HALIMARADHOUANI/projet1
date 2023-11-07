const {BOOLEAN} = require("sequelize/lib/data-types");

module.exports=(sequelize,Datatype)=>{
    const Produit=sequelize.define("Produit",{
        nom:{
            type:Datatype.STRING,
            allowNull:false
          },
          reference:{
            type:Datatype.STRING,
            allowNull:false
          },
          quantity:{
            type:Datatype.INTEGER,
      
          },
          price:{
            type:Datatype.FLOAT,
          },
         image:{
            type:Datatype.STRING,
      
          },
        
        })
        Produit.associate=models=>{
            Produit.belongsTo(models.User,{
                onDelete:"cascade"
            })
        }
            Produit.associate=models=>{
                Produit.belongsTo(models.Categorie,{
                    onDelete:"cascade"
                })
            }

        return Produit
    

}
