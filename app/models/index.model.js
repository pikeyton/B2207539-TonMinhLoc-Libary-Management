
const BookBorrowRegistration = require('./bookManagement/bookBorrowRgistration.model');
const Author = require('./system.categorys/author.model');
const Book = require('./system.categorys/book.model');
const BookField = require('./system.categorys/bookField.model');
const BookPrint = require('./system.categorys/bookPrint.model');
const Publisher = require('./system.categorys/publisher.model');
const Reader = require('./users/reader.model');
const Staff = require('./users/staff.model');

module.exports = {
    BookBorrowRegistration,
    Author,
    Book,
    BookField,
    BookPrint,
    Publisher,
    Reader,
    Staff,
};