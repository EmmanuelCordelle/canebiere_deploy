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
  let result = await JSON.parse(req.body.result)
  let user = req.body.user

  let newEtude = new etudesModel({
    user: user,
    donnee: datas,
    result: result
  })

  let etudeSaved = await newEtude.save()

  res.json((result = 'ok'))
})
router.post('/mes_etudes', async function (req, res, next) {
  console.log('requet ok')

  let result = false
  let response = await etudesModel.find({user: req.body.user})
  response ? (result = true) : result

  let found = []

  for (let etude of response) {
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

router.post('/savePDF', async function (req, res, next) {
  console.log('requet ok')
  console.log(req.body.datas)

  ReactPDF.render(req.body.datas, `${__dirname}/test.pdf`)

  res.json({result, etudes: found_localisation})
})

module.exports = router
