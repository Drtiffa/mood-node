const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
var users = require('./routes/users');
const app = express();

mongoose.connect('mongodb://localhost/mood-node', {useNewUrlParser: true});

var params = [
    {categorie: 'shape', element: 'element_1', image: '../images/shape/shape1.svg'},
    {categorie: 'shape', element: 'element_2', image: '../images/shape/shape2.svg'},
    {categorie: 'shape', element: 'element_3', image: '../images/shape/shape3.svg'},
    {categorie: 'face', element: 'element_4', image: '../images/face/face1.svg'},
    {categorie: 'face', element: 'element_5', image: '../images/face/face2.svg'},
    {categorie: 'face', element: 'element_6', image: '../images/face/face3.svg'},
    {categorie: 'face', element: 'element_7', image: '../images/face/face4.svg'},
    {categorie: 'face', element: 'element_8', image: '../images/face/face5.svg'},
    {categorie: 'face', element: 'element_9', image: '../images/face/face6.svg'},
    {categorie: 'face', element: 'element_10', image: '../images/face/face7.svg'},
    {categorie: 'face', element: 'element_11', image: '../images/face/face8.svg'},
    {categorie: 'hair', element: 'element_12', image: '../images/hair/hair1.svg'},
    {categorie: 'hair', element: 'element_13', image: '../images/hair/hair2.svg'},
    {categorie: 'hair', element: 'element_14', image: '../images/hair/hair3.svg'},
    {categorie: 'hair', element: 'element_15', image: '../images/hair/hair4.svg'},
    {categorie: 'hair', element: 'element_16', image: '../images/hair/hair5.svg'},
    {categorie: 'hair', element: 'element_17', image: '../images/hair/hair6.svg'},
    {categorie: 'hair', element: 'element_18', image: '../images/hair/hair7.svg'},
    {categorie: 'accessorie', element: 'element_19', image: '../images/accessorie/accessorie1.svg'},
    {categorie: 'accessorie', element: 'element_20', image: '../images/accessories/accessorie2.svg'},
    {categorie: 'accessorie', element: 'element_21', image: '../images/accessories/accessorie3.svg'},
    {categorie: 'accessorie', element: 'element_22', image: '../images/accessories/accessorie4.svg'},
    {categorie: 'accessorie', element: 'element_23', image: '../images/accessories/accessorie5.svg'},
    {categorie: 'accessorie', element: 'element_24', image: '../images/accessories/accessorie6.svg'},
    {categorie: 'accessorie', element: 'element_25', image: '../images/accessories/accessorie7.svg'}
]

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/params', function(req, res) {
    res.send(params);
});

app.use('/users', users);

app.listen( 3001, function() {
    console.log('Server started on port 3001...');
});