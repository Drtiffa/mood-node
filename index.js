const params = require('./params');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const users = require('./users');
const userRouter = require('./users/routes');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost/mood-node', {useNewUrlParser: true});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', function(req, res) {
    res.send(params);
});

app.get('/users', users.controller.getAll);
app.post('/users', users.controller.createUser);
app.post('/auth', users.controller.authUser)
app.put('/users/update/:id', users.controller.updateUser);
app.delete('/users/:id', users.controller.deleteUser);

app.use('/users', userRouter);

app.listen( 3001, function() {
    console.log('Server started on port 3001...');
});