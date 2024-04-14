const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AuthSchema = new Schema({
    name:{
        type: String
    },
    email:{
        type: String
    },
    phone:{
        type:String
    },
    password:{
        type:String
    }
}, {timestamps:true})

const Auth = mongoose.model('Auth', AuthSchema)
module.exports = Auth;