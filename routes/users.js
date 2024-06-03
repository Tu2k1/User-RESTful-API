const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Post = require('../models/post')
const getUser = require("../middlewares/check_user")

router.get('/',async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)

    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/', async (req,res)=>{
    const{first_name,last_name,email,password, birth_date} = req.body
    const user = new User({
        first_name: first_name,
        last_name: last_name,
        email:email,
        password: password,
        birth_date: birth_date
    })
    try{
        const newUser = await user.save()
        res.status(201).json({message:'user created successfully', user:newUser})
    }
    catch (err){
        res.status(400).json({message:err.message})
    }
})

router.get('/:user_id', getUser,async (req, res) => {
    res.json(req.user)
})

// get all posts: users/:user_id/posts/
// post: users/:user_id/posts/
// get specific post: users/:user_id/posts/:post_id
// patch specific post: users/:user_id/posts/:post_id
// delete specific post: users/:user_id/posts/:post_id
router.patch('/:user_id',getUser, async (req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.user._id,req.body,{new:true})
        res.json({message: 'user updated successfully', user:user})
    }
    catch (err){
        res.status(500).json({message:err.message})
    }
})

router.delete('/:user_id',getUser, async (req,res)=>{
    try{
        const user = await User.findByIdAndRemove(req.user._id)
        res.json({message:"User deleted successfully", user:user})
    }
    catch (err){
        res.status(500).json({message:err.message})
    }
})




router.get('/:user_id/posts/', getUser,async (req, res) => {
    try {
        const userPosts = await Post.find({user_id: req.user._id})
        res.json(userPosts)

    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

router.post('/:user_id/posts/', getUser,async (req, res) => {
    const {title, body, post_date} = req.body;
    const post = new Post({
        title: title,
        body: body,
        post_date: post_date,
        user_id: req.user._id
    })

    try{
        const newPost = await post.save()
        res.status(201).json({message:'post created successfully', post:newPost})
    }
    catch (err) {
        res.status(400).json({message:err.message})
    }
})

router.patch('/:user_id/posts/:post_id',getUser, async (req,res)=>{
    try{
        const post = await Post.findByIdAndUpdate(req.params.post_id,req.body,{new:true})
        res.json({message: 'post updated successfully', post:post})
    }
    catch (err){
        res.status(500).json({message:err.message})
    }
})

router.delete('/:user_id/posts/:post_id',getUser, async (req,res)=>{
    try{
        const post = await Post.findByIdAndRemove(req.params.post_id)
        res.json({message:"post deleted successfully", post:post})
    }
    catch (err){
        res.status(500).json({message:err.message})
    }
})

module.exports = router