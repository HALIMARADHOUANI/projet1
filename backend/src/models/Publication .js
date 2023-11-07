
module.exports = (sequelize, Datatype) => {
    const Publication= sequelize.define("Publication",{
      nom_pub:{
        type:Datatype.STRING,
        allowNull:false
      },
      extension_status:{
        type:Datatype.STRING,
      },
      extension_video:{
        type:Datatype.STRING,
  
      },
      type:{
        type:Datatype.STRING,
      },
     picture:{
        type:Datatype.STRING,
  
      },
     
    })

      Publication.associate=models=>{
        Publication.hasMany(models.Commentaire,{
            onDelete:"cascade"
        })
        Publication.belongsTo(models.User,{
            onDelete:"cascade"
        }) 
      }
                return Publication
            
              
            }
