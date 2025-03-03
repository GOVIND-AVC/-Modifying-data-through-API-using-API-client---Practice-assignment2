const mongoose = require('mongoose')

const userschema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
        required:true
    }
})


const users=mongoose.model('users',userschema)

module.exports=users;