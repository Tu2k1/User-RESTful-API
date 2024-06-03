require('dotenv').config()

const express = require('express')
const usersRouter = require('./routes/users')
const {mongoose} = require('mongoose')
const app = express()
const myUri = process.env.MONGO_URI
mongoose.connect(myUri,{useNewUrlParser:true, useUnifiedTopology: true})
    .then(() => console.log('Connected to database'))
    .catch((err) => console.log(err.message))

app.use(express.json())
app.use('/users', usersRouter)
app.get('/', (req, res) => {
    res.json({message:"index path"})
})
app.listen(3000,()=>{
    console.log('server listen on port 3000')
})