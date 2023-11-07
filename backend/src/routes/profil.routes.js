

const express=require('express')
const route=express.Router()
const db = require('../models')

route.post('/createprofil',(req,res,next)=>{
   db.Profil.create({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    numTel:req.body.numTel,
    UserId: req.body.UserId,

   }).then((response)=>res.status(200).send(response))
   .catch((err)=>res.status(400).send(err))

})
route.get('/Profil/:id',(req,res,next)=>{
    db.Profil.findOne({ where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))

 })
 route.get('/Profils',(req,res,next)=>{
    db.Profil.findAll({include:[db.User]})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))

 })
 route.patch('/Profil/:id',(req,res,next)=>{
    db.Profil.update({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        numTel:req.body.numTel,
        UserId: req.body.UserId,

       },{where:{id:req.param.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))

 })
 route.delete('/:id',(req,res,next)=>{
   db.User.destroy ({where:{id:req.params.id}})
   .then((response)=>res.status(200).send(response))
   .catch((err)=>res.status(400).send(err))
 })
 module.exports=route
