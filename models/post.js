const mongoose = require('mongoose')
const User = require('./user');
const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type:String,
        required: true
    },
    post_date:{
        type: Date,
        required: false,
        default: Date.now
    },
    user_id:{
        type: mongoose.Types.ObjectId,ref: "User"
    },
});

module.exports = mongoose.model('posts', postSchema)