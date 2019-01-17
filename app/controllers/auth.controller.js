const User = require('../models/user.model');
const config = require('../../config/config');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {

  // We can use express-validator package or joi package for the input validation for more particular validation error messages. 
  // For now I am applying validations manually

  const username = req.body.username
  const password = req.body.password
  if (!username || !password ){
    return res.status(400).send("Bad request: username and password are required.")
  }

  if (typeof(username) !== "string" || typeof(password) !== "string"){
    return res.status(400).send("Bad request: Please check your parameters")
  }

  if (password.length < 4){
    return res.status(400).send("Bad request: Password must be atleast 4 characters")
  }

    const user = new User({
      username: username,
      password: password,  // I usually use bcrypt to hash the password before saving it to database 
      name:req.body.name
    });

    user.save()
      .then(user => {
        const token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({ auth: true, token: token });
      })
      .catch(err => {
        return res.status(500).send("There was a problem registering the user.")
      })
}

exports.login = (req, res) => {

    const username = req.body.username
    const password = req.body.password
    if (!username || !password ){
      return res.status(400).send("Bad request: username and password are required.")
    }
  
    if (typeof(username) !== "string" || typeof(password) !== "string"){
      return res.status(400).send("Bad request: Please check your parameters")
    }
  
    if (password.length < 4){
      return res.status(400).send("Bad request: Password must be atleast 4 characters")
    }
  User.findOne({ username: req.body.username })
  .then( user => {
    if (!user || user == null) {
        return res.status(404).send({
          response:'Authentication Failure',
          auth: false,
          token: null});
      }

      if (req.body.password !== user.password){
        return res.status(401).send({ auth: false, token: null,response:'Authentication Failure' });      
    }

      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token, user: user });

  })
  .catch( err => {
    return res.status(500).send('Error on the server.');
  })
}

