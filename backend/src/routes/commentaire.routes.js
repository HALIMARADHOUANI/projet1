

const express=require('express')
const route=express.Router()
const db = require('../models')

route.post('/',(req,res,next)=>{
   db.Commentaire.create({
    contenue_commentaires:req.body.contenue_commentaires,
    date_creation_commentaires:Date.now(),
    UserId: req.body.UserId,
       PublicationId: req.body.PublicationId,


   }).then((response)=>res.status(200).send(response))
   .catch((err)=>res.status(400).send(err))

})
route.get('/:id',(req,res,next)=>{
    db.Commentaire.findOne({ where:{id:req.params.id},include:[db.User]})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
 
 })
 route.get('/',(req,res,next)=>{
    db.Commentaire.findAll({include:[db.User,db.Publication]})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
 
 })
 route.patch('/:id',(req,res,next)=>{
     console.log(req.body)
    db.Commentaire.update({
        contenue_commentaires:req.body.contenue_commentaires,
       },{where:{id:req.body.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
 
 })
 route.delete('/:id',(req,res,next)=>{
   db.Commentaire.destroy ({where:{id:req.params.id}})
   .then((response)=>res.status(200).send({
       status: 'success',

   }))
   .catch((err)=>res.status(400).send(err))
 })
 module.exports=route
