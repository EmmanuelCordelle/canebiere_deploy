var mongoose = require('mongoose')

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

mongoose.connect(
  'mongodb+srv://Emmanuel:4qAfRSNfIxsxnp6f@cluster0.mt1rz.mongodb.net/canebiere',

  options,
  function (err) {
    console.log(err)
  }
)
