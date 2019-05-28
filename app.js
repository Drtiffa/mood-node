const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
var users = require('./routes/users');
const app = express();

mongoose.connect('mongodb://localhost/mood-node', {useNewUrlParser: true});

var params = [
    {categorie: 'shape', element: 'element_1', image: '/src/images/shape/shape1.svg'},
    {categorie: 'shape', element: 'element_2', image: '/src/images/shape/shape2.svg'},
    {categorie: 'shape', element: 'element_3', image: '/src/images/shape/shape3.svg'},
    {categorie: 'face', element: 'element_4', image: '/src/images/face/face1.svg'},
    {categorie: 'face', element: 'element_5', image: '/src/images/face/face2.svg'},
    {categorie: 'face', element: 'element_6', image: '/src/images/face/face3.svg'},
    {categorie: 'face', element: 'element_7', image: '/src/images/face/face4.svg'},
    {categorie: 'face', element: 'element_8', image: '/src/images/face/face5.svg'},
    {categorie: 'face', element: 'element_9', image: '/src/images/face/face6.svg'},
    {categorie: 'face', element: 'element_10', image: '/src/images/face/face7.svg'},
    {categorie: 'face', element: 'element_11', image: '/src/images/face/face8.svg'},
    {categorie: 'hair', element: 'element_12', image: '/src/images/hair/hair1.svg'},
    {categorie: 'hair', element: 'element_13', image: '/src/images/hair/hair2.svg'},
    {categorie: 'hair', element: 'element_14', image: '/src/images/hair/hair3.svg'},
    {categorie: 'hair', element: 'element_15', image: '/src/images/hair/hair4.svg'},
    {categorie: 'hair', element: 'element_16', image: '/src/images/hair/hair5.svg'},
    {categorie: 'hair', element: 'element_17', image: '/src/images/hair/hair6.svg'},
    {categorie: 'hair', element: 'element_18', image: '/src/images/hair/hair7.svg'},
    {categorie: 'accessorie', element: 'element_19', image: '/src/images/accessorie/accessorie1.svg'},
    {categorie: 'accessorie', element: 'element_20', image: '/src/images/accessorie/accessorie2.svg'},
    {categorie: 'accessorie', element: 'element_21', image: '/src/images/accessorie/accessorie3.svg'},
    {categorie: 'accessorie', element: 'element_22', image: '/src/images/accessorie/accessorie4.svg'},
    {categorie: 'accessorie', element: 'element_23', image: '/src/images/accessorie/accessorie5.svg'},
    {categorie: 'accessorie', element: 'element_24', image: '/src/images/accessorie/accessorie6.svg'},
    {categorie: 'accessorie', element: 'element_25', image: '/src/images/accessorie/accessorie7.svg'}
]

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/params', function(req, res) {
    res.send({ params });
});

app.use('/users', users);

app.listen( 3001, function() {
    console.log('Server started on port 3001...');
});