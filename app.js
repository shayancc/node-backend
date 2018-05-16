var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var basePath = '/todo';
var port = 6200;

mongoose.connect('mongodb://mongodb').then(() => {
	console.log('Backend started');
}).catch((err) => {
	console.log('Backend error: ', err.stack);
	process.exit(1);
});

var todoListRoutes = require('./src/routes/todoListRoutes');

var app = express();
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(basePath, todoListRoutes);


app.listen(port, () => {
	console.log('TodoList Backend running on port: ', port);
})