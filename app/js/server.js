const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const util = require('util');

const bookModel = require('./bookModel');

const path_to_root  = path.join(__dirname, '/../../public/');

app.use(bodyParser.json());
app.use(expressValidator());
app.use(cors());

function isValid(req,res)
{
	req.checkBody('author', 'Name of book').notEmpty().isInt();
    const errors = req.validationErrors();

	if (errors) {
   	    res.status(200).send('There have been validation errors: ' + util.inspect(errors));
    }
}


// Connect to Mongoose
mongoose.connect('mongodb://localhost/BookStore');
const db = mongoose.connection;

app.get('/', function(req, res){
    res.sendFile(path_to_root + "index.html");
});

app.get('/app', function(req, res){
    res.sendFile( path_to_root + "app.html");
});

app.get('/books', function(req, res) {
	bookModel.getBooks(function(err, books){
		if(err){
			throw err;
		}
		res.json(books);
	},2);

})

app.post('/book', function(req, res) {
	const book = req.body;

	if (isValid(req,res)) {
	    bookModel.addBook(book,function(err){
	    	if(err){
				res.status(201).send({response: "Error"});
	    	}
			else{
				res.status(201).send({response: "Added" ,book:(req.body)});
			}
	    });
	}

});



module.exports = app; 