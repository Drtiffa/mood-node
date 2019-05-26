const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.send('Hello world');
});

app.listen( 3001, function() {
    console.log('Server started on port 3001...');
});