const express = require('express')
const mongoose = require('mongoose')
const usersModel = require('../models/users')
const bcrypt = require('bcrypt')
const uid2 = require('uid2')

var router = express.Router()

// ajout d'un document dans la collection utilisateur en manuel
// const initialisation= async()=>{
//   const hash=bcrypt.hashSync('test',10)

//   let user=new usersModel({
//     Nni:'C37458',
//     email:'toto@edf.fr',
//     firstName:'toto',
//     password:hash,
//     name:'toto_name',
//     type:'user',
//     token:(uid2(32)),
//   })

//   var userSaved=await user.save()
// console.log(userSaved)
// }
// initialisation()

// connection d'un utilisateur

router.post('/sign-in', async function (req, res, next) {
  let result = false
  let messageError = null
  const findUser = await usersModel.findOne({Nni: req.body.Nni})

  if (findUser) {
    const password = req.body.password
    result = bcrypt.compareSync(password, findUser.password) ? true : false
    if (!result) {
       messageError = 'Mot de passe incorrect'
    }
  } 
  else {
    messageError = 'Utilisateur inconnu'
  }
  result?res.json({result, findUser:findUser.token, messageError})
  :res.json({result, messageError})

})

module.exports = router
