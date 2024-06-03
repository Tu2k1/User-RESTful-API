const User = require('../models/user')

module.exports = async function getUser(req,res,next){
    let user
    try{
        user = await User.findById(req.params.user_id)
        if(user == null){
            return res.status(404).json({message:'user not found'})
        }
    }
    catch (err){
        res.status(500).json({message:err.message})
    }

    req.user = user
    next()
}