require('dotenv').config()

const express = require('express')
const usersRouter = require('./routes/users')
const {mongoose} = require('mongoose')
const app = express()
const myUri = process.env.MY_URI
mongoose.connect(myUri,{useNewUrlParser:true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.once('open', () => console.log('connected to database'))


app.use(express.json())
app.use('/users', usersRouter)

app.get('/', (req, res) => {
    res.json({message:"index path"})
})
app.listen(3000,()=>{
    console.log('server listen on port 3000')
})