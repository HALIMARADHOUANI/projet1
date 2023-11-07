


const express=require('express')
const route=express.Router()
const db = require('../models')

route.post('/createPanier',(req,res,next)=>{
   db.itempanier.create({
    quantite:req.body.quantite,
    prix:req.body.prix,
    Idproduit:req.body.Idproduit,
    Idpanier:req.body.Idpanier,
   

   }).then((response)=>res.status(200).send(response))
   .catch((err)=>res.status(400).send(err))

})
route.get('/Panier/:id',(req,res,next)=>{
    db.itempanier.findOne({ where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
 
 })
 route.get('/Panier',(req,res,next)=>{
    db.itempanier.findAll({include:[db.User]})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
 
 })
 route.patch('/Panier/:id',(req,res,next)=>{
    db.itempanier.update({
   quantite:req.body.quantite,
    prix:req.body.prix,
    Idproduit:req.body.Idproduit,
    Idpanier:req.body.Idpanier,

    
       },{where:{id:req.param.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
 
 })
 route.delete('/Panier/:id',(req,res,next)=>{
   db.Panier.destroy ({where:{id:req}})
   .then((response)=>res.status(200).send(response))
   .catch((err)=>res.status(400).send(err))
 })
 module.exports=route