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
	req.checkBody('author', 'Name of book').notEmpty();
	req.checkBody('title', 'Title of book').notEmpty();
	req.checkBody('year', 'Year of book publish').notEmpty().isInt();

    const errors = req.validationErrors();

	if (errors) {
   	    res.status(401).send('There have been validation errors: ' + util.inspect(errors));
   	    return false;
    }else {
    	return true;
    }
}


// Connect to Mongoose
mongoose.connect('mongodb://localhost/BookStore');
const db = mongoose.connection;

//Get all books
app.get('/books', function(req, res) {
	bookModel.getBooks(function(err, books){
		if(err){
			throw err;
		}
		res.json(books);
	});
})

//Get one book
app.get('/book/:_id', function(req, res) {
    const book_id = req.params._id;

    bookModel.getBook(book_id,function(err, books){
		if(err){
			throw err;
		}
		res.status(200).send(books);
	});
});

//Insert new book
app.post('/book', function(req, res) {
	const book = req.body;

	if (isValid(req,res)) {
	    bookModel.addBook(book,function(err){
	    	if(err){
				res.status(500).send({response: "Error"});
	    	}
			else{
				res.status(201).send({response: "Added" ,book:(req.body)});
			}
	    });
	}

});

//Update book
app.put('/book/:_id', function(req, res) {
    const book_id = req.params._id;
    const book = req.body;

    bookModel.getBook(book_id,book,{},function(err, book){
		if(err){
			throw err;
		}
		res.status(200).send(book);
	});
})

//Delete book
app.delete('/book/:_id',function(req, res){
	const book_id = req.params._id;

	bookModel.removeBook(book_id, function(err, book){
		if(err){
			throw err;
		}
		res.status(200).send(book);
	});
})


module.exports = app; 