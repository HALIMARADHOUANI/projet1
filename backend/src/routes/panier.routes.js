

const express=require('express')
const route=express.Router()
const db = require('../models')

route.post('/',(req,res,next)=>{
   db.Panier.create({
    nom:req.body.nom,
    quantite:req.body.quantite,
    description:req.body.description,
    prix:req.body.prix,
    UserId: req.body.UserId,

   }).then((response)=>res.status(200).send(response))
   .catch((err)=>res.status(400).send(err))

})
route.get('/:id',(req,res,next)=>{
    db.panier.findOne({ where:{id:req.params.id},include:[db.User,db.itemPanier]})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
 
 })
 route.get('/',(req,res,next)=>{
    db.panier.findAll({include:[db.User]})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
 
 })
 route.patch('/:id',(req,res,next)=>{
    db.panier.update({
        nom:req.body.nom,
        quantite:req.body.quantite,
        description:req.body.description,
        prix:req.body.prix,
        UserId: req.body.UserId,
       },{where:{id:req.param.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
 
 })
 route.delete('/:id',(req,res,next)=>{
   db.panier.destroy ({where:{id:req}})
   .then((response)=>res.status(200).send(response))
   .catch((err)=>res.status(400).send(err))
 })
 module.exports=route
