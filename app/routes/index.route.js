const BookBorrowRegistration = require('./bookManagement/bookBorrowRgistration.route');

const Author = require('./system.categorys/author.route')
const Book = require('./system.categorys/book.route');
const BookField = require('./system.categorys/bookField.route');
const BookPrint = require('./system.categorys/bookPrint.route');
const Publisher = require('./system.categorys/publisher.route');
const Reader = require('./users/reader.route');
const Staff = require('./users/staff.route');
module.exports = {
    BookBorrowRegistration,

    Author,
    Book,
    BookField,
    BookPrint,
    Publisher,
    
    Staff,
    Reader,
};