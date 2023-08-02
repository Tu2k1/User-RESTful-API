const express = require('express')
const router = express.Router()
const User = require('../models/user')



router.get('/',async (req,res)=>{
    try{
        const users = await User.find()
        res.json(users)
    }catch (err){
        res.status(500).json({message:err.message})
    }
})

router.post('/', async (req,res)=>{
    const user = new User({
        name: req.body.name,
        email:req.body.email,
        birth_date: req.body.birth_date
    })
    try{
        const newUser = await user.save()
        res.status(201).json({message:'user created successfully', user:newUser})
    }
    catch (err){
        res.status(400).json({message:err.message})
    }
})

router.get('/:id', getUser,async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findById(id)
        res.json(user)
    } catch (err) {
        res.status(500).json({message:err.message})
    }
})

router.patch('/:id',getUser, async (req,res)=>{
    const id = req.params.id
    try{
        const user = await User.findByIdAndUpdate(id,req.body,{new:true})
        res.json({message: 'user updated successfully', user:user})
    }
    catch (err){
        res.status(500).json({message:err.message})
    }
})

router.delete('/:id',getUser, async (req,res)=>{
    const id = req.params.id
    try{
        const user = await User.findByIdAndRemove(id)
        res.json({message:"User deleted successfully", user:user})
    }
    catch (err){
        res.status(500).json({message:err.message})
    }
})


async function getUser(req,res,next){
    console.log(req.params.id)
    let user
    try{
        user = await User.findById(req.params.id)
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
module.exports = router