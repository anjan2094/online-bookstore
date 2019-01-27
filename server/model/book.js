const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/bookproject', { useNewUrlParser: true })

const BookSchema = new mongoose.Schema({
   "isbn": String,
   "title": String,
   "subtitle": String,
   "author": String,
   "published": String,
   "publisher": String,
   "pages": Number,
   "description": String,
   "website": String
}, { collection: 'bookStore' })

const allBook = module.exports = mongoose.model('allBook', BookSchema)
module.exports.getBooks = function () {
   return new Promise((resolve)=>{
      allBook.find()
      .then(data=>{
         resolve(data);
      });
   } )
}

module.exports.getBookById = function (id) {
   return new Promise((resolve)=>{
      allBook.findOne({'isbn' : id})
      .then(data=>{
         {
            resolve(data);
         }
      });
   } )
   }