const BookBorrowRegistration = require('./bookManagement/bookBorrowRgistration.route');
const BookBorrowTracking = require('./bookManagement/bookBorrowTracking.route');
const Comment = require('./bookManagement/comment.route');

const Author = require('./system.categorys/author.route')
const Book = require('./system.categorys/book.route');
const BookField = require('./system.categorys/bookField.route');
const BookPrint = require('./system.categorys/bookPrint.route');
const Publisher = require('./system.categorys/publisher.route');

const Auth = require('./users/auth.route');
const Reader = require('./users/reader.route');
const Staff = require('./users/staff.route');
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
    Staff,
    Reader,
};