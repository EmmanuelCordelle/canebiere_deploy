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
  let user = req.body.name
  let pwd = req.body.password
  console.log('email :', email, 'user : ', user, 'mot de passe :', pwd)
  res.json((result = {pwd}))
})


router.post('/save', async function (req, res, next) {
  
  let datas = await JSON.parse(req.body.datas)
  let result =await JSON.parse(req.body.result)
  let user=req.body.user
  
  let newEtude= new etudesModel({
    user:user,
    donnee:datas,
    result:result
   
  })


 let etudeSaved= await newEtude.save()
  

  res.json((result = 'ok'))
})
router.post('/mes_etudes', async function (req, res, next) {
  
  console.log('requet ok')
  

  let result=false
  let found=await etudesModel.find({user:req.body.user})
  found? result=true:result

  console.log(found)

  let found_localisation=[]

  for(let etude of found){
    found_localisation.push({id:etude.id,localisation:etude.donnee.localisation})
  }
  console.log(found_localisation)
  
  res.json(result,found_localisation )
})




module.exports = router
