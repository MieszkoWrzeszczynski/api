const mongoose = require('mongoose');

const book = {
	author:{
		type: String,
		required: true,
	},
	title:{
		type: String,
		required: true
	},
	year:{
		type: Number,
		required: true
	}

}

const bookModel = mongoose.model('Book',book);

module.exports = bookModel;

module.exports.addBook = function(new_book,callback){
   
    const book = new bookModel(new_book);

    book.save(function(err){
		callback();
	});

}

module.exports.getBooks = function(callback, limit){
	bookModel.find({},callback).limit(limit);
}

module.exports.getBook = function(id,callback){
	bookModel.findById(id, callback);
}

module.exports.getBook = function(id,book,options,callback){
	bookModel.update(id, book, options, callback);
}

module.exports.removeBook = function(id,callback){
	const query = {_id: id};
	bookModel.remove(query, callback);
}