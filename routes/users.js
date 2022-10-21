var express = require('express')
var mongoose = require('mongoose')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log('test ok')
  res.send('respond with a resource')
})

module.exports = router
