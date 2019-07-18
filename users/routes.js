var express = require('express');
var jwt = require('jsonwebtoken');
var users = express.Router();
var User = require("./model");

// Login
users.post('/signin', (req,res) => {
  var email = req.body.email;
  var password = req.body.password;
  // permet de trouver user
  User.find({ email, password }, (err,find_res) => {
    if (err) {
      res.json({ "resultType": "failure", "resultMessage": err });
    } else if (find_res.length === 0) {
      res.json({ "resultType": "failure", "resultMessage": "Wrong credentials." });
    } else {
      var token = jwt.sign({ email }, 'shhhhh'); // si bien connecter alors renvoi token
      res.json({ "resultType": "success", "resultMessage": "You are successfully logged in.", "token": token });
    }
  })
})

// Créer un compte
users.post('/signup', (req,res) => {
    var newUser = new User(req.body)

    newUser.save((err, user) => {
      if (err) {
        res.json({ "resultType": "failure", "resultMessage": err });
      } else {
        res.json({ "resultType": "success", "resultMessage": "Account successfully created." });
      }
    })
})
  
  module.exports = users;