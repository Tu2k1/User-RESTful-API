const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    birth_date:{
        type:Date,
        required:false,
        default:Date.now
    }
})


module.exports = mongoose.model('users', userSchema)

