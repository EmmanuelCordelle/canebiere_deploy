const {response} = require('express')
var express = require('express')
var router = express.Router()
var etudesModel = require('../models/etudes')

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
  let dataResult = await JSON.parse(req.body.result)
  let user = req.body.user

  let result=false

  let response = await etudesModel.find({
    'donnee.localisation.Cnpe': datas.localisation.Cnpe,
    'donnee.localisation.Tranche': datas.localisation.Tranche,
    'donnee.localisation.Systeme': datas.localisation.Systeme,
    'donnee.localisation.Numero': datas.localisation.Numero,
    'donnee.localisation.Bigramme': datas.localisation.Bigramme
  })
  console.log(response)

  //si aucune étude trouvée on sauvegarde
    if(response.length===0){
    datas.localisation['Indice']=0  
    let newEtude = new etudesModel({
      user: user,
      donnee: datas,
      result: dataResult
    })
  
    let etudeSaved = await newEtude.save()
    result=true
  }
  
  res.json(result)
  
})


// route d'ajout d'un nouvel indice d'une étude
router.post('/save-update', async function (req, res, next) {

   let datas = await JSON.parse(req.body.datas)
   let dataResult = await JSON.parse(req.body.result)
   let user = req.body.user

   let result=false

  let response = await etudesModel.find({
    'donnee.localisation.Cnpe': datas.localisation.Cnpe,
    'donnee.localisation.Tranche': datas.localisation.Tranche,
    'donnee.localisation.Systeme': datas.localisation.Systeme,
    'donnee.localisation.Numero': datas.localisation.Numero,
    'donnee.localisation.Bigramme': datas.localisation.Bigramme
  })

  if(response){
    datas.localisation['Indice']=response.length  
    let newEtude = new etudesModel({
      user: user,
      donnee: datas,
      result: dataResult
    })
  
    let etudeSaved = await newEtude.save()
    result=true
  }

  
  res.json(result)
})




router.post('/mes_etudes', async function (req, res, next) {
  console.log('requet ok')
  

  let result = false
  let response = await etudesModel.find({user: req.body.user})
  response ? (result = true) : result

  let found = []

  for (let etude of response) {
    console.log(etude)
    found.push(etude.donnee.localisation)
  }
  console.log('found :', found)

  res.json({result, etudes: found})
})

router.post('/etudeByID', async function (req, res, next) {
  console.log('requete etudeByID ok')

  let result = false
  console.log(req.body.id)
  let found = await etudesModel.find({'donnee.localisation._id': req.body.id})
  console.log(found)
  found ? (result = true) : result

  res.json({result, etude: found})
})

router.post('/search', async function (req, res, next) {
  console.log('requete search ok')

  let result = false
  let datas = req.body
  console.log(datas)

  //***** Securisation des données de recherche: null si vide */
  let site = datas.site ? datas.site : null
  let tranche = datas.tranche ? parseInt(datas.tranche) : null
  let systeme = datas.systeme ? datas.systeme : null
  let repere = datas.repere ? parseInt(datas.repere) : null
  let bigramme = datas.bigramme ? datas.bigramme : null

  let found = []
  let response = null

  if (site === null && tranche === null && systeme === null && repere === null && bigramme === null) {
    console.log('find all')
    response = await etudesModel.find()
  } else {
    response = await etudesModel.find({
      'donnee.localisation.Cnpe': site !== null ? site : {$exists: true},
      'donnee.localisation.Tranche': tranche !== null ? tranche : {$exists: true},
      'donnee.localisation.Systeme': systeme !== null ? systeme : {$exists: true},
      'donnee.localisation.Numero': repere !== null ? repere : {$exists: true},
      'donnee.localisation.Bigramme': bigramme !== null ? bigramme : {$exists: true}
    })
  }

  if (response) {
    result = true

    for (let etude of response) {
      console.log(etude)
      found.push(etude.donnee.localisation)
    }
  }

  res.json({result, etudes: found})
})

router.post('/savePDF', async function (req, res, next) {
  console.log('requet ok')
  console.log(req.body.datas)

  ReactPDF.render(req.body.datas, `${__dirname}/test.pdf`)

  res.json({result, etudes: found_localisation})
})

module.exports = router
