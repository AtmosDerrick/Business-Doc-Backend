const mongoose = require('mongoose')
const Schema = mongoose.Schema

const users = new Schema({
    name:{
        type: String
    },
    designation:{
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    age:{
        type: Number
    },
    avatar:{
        type:String

    }
},{
    timestamps: true
})

const User = mongoose.model('User', users)
module.exports = User