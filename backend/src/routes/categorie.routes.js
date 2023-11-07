
const express=require('express')
const route=express.Router()
const db = require('../models')

route.post('/',(req,res,next)=>{
   db.Categorie.create({
    nom:req.body.nom,



   }).then((response)=>res.status(200).send(response))
   .catch((err)=>res.status(400).send(err))

})
route.get('/:id',(req,res,next)=>{
    console.log(req.params.id)
    db.Categorie.findOne({ where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
 
 })
 route.get('/',(req,res,next)=>{
    db.Categorie.findAll()
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
 
 })
 route.patch('/:id',(req,res,next)=>{
    db.Categorie.update({
        nom:req.body.nom,
       },{where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
 
 })
 route.delete('/:id',(req,res,next)=>{
   db.Categorie.destroy ({where:{id:req.params.id}})
   .then((response)=>res.status(200).send({status:'success'}))
   .catch((err)=>res.status(400).send(err))
 })
 module.exports=route
