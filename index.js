require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

//Routes
const UserRoute = require('./routes/UsersRoutes')
const AuthRoute = require('./routes/AuthRoute')

//connect to database
mongoose.connect('mongodb://localhost:27017/businessdoc')
const db = mongoose.connection

db.on('error', (err)=>{
    console.log(err)
})

db.once('open', ()=>{
    console.log('Database connection established')
})


//initialize server

const app = express();

const PORT = 5000 || process.env.PORT

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())



app.get('', (req, res)=>{
    res.send("Hello World")

} )

app.use('/api/users/', UserRoute)
app.use('/api/', AuthRoute)






app.listen(PORT, ()=>{
    console.log(`App listening on port ${PORT}`)
})

module.exports = app;