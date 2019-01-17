const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const config = require('./config/config');
const path = require('path')

var app = express()
app.use(express.static(path.join(__dirname, 'client/build')))
app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

mongoose.connect(config.url) // Connecting to database
.then(() => console.log("Connected to mongodb"))
.catch(err => console.error("Error connecting to the mongodb", err))

require('./app/routes/auth.routes')(app) // We can also use the router provided by Express
require('./app/routes/event.routes')(app)

app.get( '*',(req,res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
})

app.listen(2000)