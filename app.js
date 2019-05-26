const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
var users = require('./routes/users');
const app = express();

mongoose.connect('mongodb://localhost/mood-node', {useNewUrlParser: true});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.send('Home Page');
});

app.use('/users', users);

app.listen( 3001, function() {
    console.log('Server started on port 3001...');
});