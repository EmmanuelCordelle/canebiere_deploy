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
  let token, type
  console.log(req.body)
  const findUser = await usersModel.findOne({Nni: req.body.Nni})

  if (findUser) {
    const password = req.body.password
    result = bcrypt.compareSync(password, findUser.password) ? true : false
    if (!result) {
      console.log('mot de passe incirrect')
      messageError = 'Mot de passe incorrect'
    }
  } else {
    console.log('test')
    messageError = 'Nni inconnu'
  }

  res.json({result, findUser, messageError})
})

module.exports = router
