const Author = require('./system.categorys/author.service');
const Book = require('./system.categorys/book.service');
const BookField = require('./system.categorys/bookField.service');
const BookPrint = require('./system.categorys/bookPrint.service');
const Publisher = require('./system.categorys/publisher.service');
const Reader = require('./users/reader.service');
const Staff = require('./users/staff.service');

module.exports = {
    Author,
    Book,
    BookField,
    BookPrint,
    Publisher,
    Reader,
    Staff,
};