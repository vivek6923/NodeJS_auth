const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const config = require('./config/config');

var app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

mongoose.connect(config.url) // Connecting to database
.then(() => console.log("Connected to mongodb"))
.catch(err => console.error("Error connecting to the mongodb", err))

app.get( '/',(req,res) => {
    res.send('Welcome to the playground app') // Serve a landing page here
})

require('./app/routes/auth.routes')(app) // We can also use the router provided by Express

app.listen(2000)