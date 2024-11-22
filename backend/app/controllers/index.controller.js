const BookBorrowRegistration = require('./bookManagement/bookBorrowRgistration.controller')
const BookBorrowTracking = require('./bookManagement/bookBorrowTracking.controller');
const Comment = require('./bookManagement/comment.controller');

const Author = require('./system.categorys/author.controller')
const Book = require('./system.categorys/book.controller');
const BookField = require('./system.categorys/bookField.controller');
const BookPrint = require('./system.categorys/bookPrint.controller');
const Publisher = require('./system.categorys/publisher.controller');

const Auth = require('./users/auth.controller');
const Reader = require('./users/reader.controller');
const Staff = require('./users/staff.controller');

module.exports = {
    BookBorrowRegistration,
    BookBorrowTracking,
    Comment,

    Author,
    Book,
    BookField,
    BookPrint,
    Publisher,
    
    Auth,
    Reader,
    Staff,
}