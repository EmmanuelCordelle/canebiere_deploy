const mongoose=require('mongoose')

const usersSchema=mongoose.Schema({
    Nni:String,
    email:String,
    firstName:String,
    password:String,
    name:String,
    type:String,
    token:String,
})

const usersModel=mongoose.model('users',usersSchema)

module.exports=usersModel