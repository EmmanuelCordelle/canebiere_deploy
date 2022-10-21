var express = require('express')
var router = express.Router()

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

router.post('/sign-in', async function (req, res, next) {
  // var findUser= await usersModel.findOne({nni=req.body.nni})
  var findUser = 'C37457'
  var result = false
  //if(findUser){
  if (req.body.user === findUser) {
    var password = req.body.password
    result = password === 'test' ? true : false
    //result = bcrypt.compareSync(password,findUser.password)?true:false
  }

  res.json({result, findUser})
})

module.exports = router
