var express = require('express');
var app = express();
var d3 = require('d3');

app.get('/demo1.js', function(req, res) {
    res.sendFile(__dirname + '/' + 'demo1.js');
})

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/' + 'demo.html');
})
app.get('/demo.html', function(req, res) {
    res.sendFile(__dirname + '/' + 'demo.html');
})
app.get('/d3.js', function(req, res) {
    res.sendFile(__dirname + '/' + 'node_modules/d3/build/d3.js');
})
var server = app.listen('3000', function() {

    console.log('server start 127.0.0.1');
})