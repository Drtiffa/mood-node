const params = require('./params');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./users/routes');
const bodyParser = require('body-parser');
const app = express();

// nom de ma BDD mongodb
mongoose.connect('mongodb://localhost/mood-node', {useNewUrlParser: true});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', function(req, res) {
    res.send(params);
});

app.use('/users', userRouter);

// port de mon server
app.listen( 3001, function() {
    console.log('Server started on port 3001...');
});