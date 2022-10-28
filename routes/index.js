var express = require('express')
var router = express.Router()
var etudesModel=require('../models/etudes')

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log('test index ok')
  res.render('index', {title: 'Express'})
})

router.post('/sign-up', async function (req, res, next) {
  let email = req.body.email
  let user = req.body.nam
  let pwd = req.body.password
  console.log('email :', email, 'user : ', user, 'mot de passe :', pwd)
  res.json((result = {pwd}))
})


router.post('/save', async function (req, res, next) {
  let datas = await JSON.parse(req.body.datas)
  let result =await JSON.parse(req.body.result)

  let newEtude= new etudesModel({
    donnee:datas,
    result:result
    
  })
 let etudeSaved= await newEtude.save()
  

  console.log('datas:',datas)

  res.json((result = 'ok'))
})




module.exports = router
