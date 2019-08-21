const params = require('./params');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./users/routes');
const avatarRouter = require('./avatar/routes');
const bodyParser = require('body-parser');
const app = express();

// nom de ma BDD mongodb
// mongoose.connect('mongodb://localhost/mood-node', {useNewUrlParser: true});
mongoose.connect('mongodb+srv://mood:mood1234@cluster0-yrtcn.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', function(req, res) {
    res.send(params);
});

app.use('/users', userRouter);
app.use('/avatar', avatarRouter);

const PORT = process.env.PORT || 3001;

// port de mon server
app.listen(PORT, function() {
    console.log('Server started !');
});