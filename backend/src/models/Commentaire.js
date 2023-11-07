const Publication = require("./Publication ")

module.exports = (sequelize, Datatype) => {
    const Commentaire= sequelize.define("Commentaire",{
      contenue_commentaires:{
        type: Datatype.STRING,
        allowNull:false
      },
      date_creation_commentaires:{
        type: Datatype.STRING,
        allowNull:false
      },
   date_modification_commentaires:{
          type: Datatype.STRING,

    
    }
})

Commentaire.associate=models=>{
  Commentaire.belongsTo(models.Publication,{
      onDelete:"cascade"
  })
  Commentaire.belongsTo(models.User,{
      onDelete:"cascade"
  }) 
}    
      
    
                return Commentaire
            
       
      }
