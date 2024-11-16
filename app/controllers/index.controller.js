const BookBorrowRegistration = require('./bookManagement/bookBorrowRgistration.controller')
const BookBorrowTracking = require('./bookManagement/bookBorrowTracking.controller');

const Author = require('./system.categorys/author.controller')
const Book = require('./system.categorys/book.controller');
const BookField = require('./system.categorys/bookField.controller');
const BookPrint = require('./system.categorys/bookPrint.controller');
const Publisher = require('./system.categorys/publisher.controller');

const Reader = require('./users/reader.controller');
const Staff = require('./users/staff.controller');

module.exports = {
    BookBorrowRegistration,
    BookBorrowTracking,

    Author,
    Book,
    BookField,
    BookPrint,
    Publisher,
    
    Reader,
    Staff,
}