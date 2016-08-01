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

	// books.forEach(function(book){
	//     book = new bookModel(book);
	// 	book.save(function(err){
	// 		if(err)
	// 			console.log(err);
	// 		else
	// 	    	console.log('Added');
	// 	});
	// });

}

module.exports.getBooks = function(callback, limit){
	bookModel.find({},callback).limit(limit);
}