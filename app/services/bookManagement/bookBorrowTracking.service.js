const models = require('../../models/index.model');
const foreignKey = require('../../utils/foreignKey.util');
const err = require('../../utils/service.error.util');


async function validateReference(bookBorrowTracking) {
    await foreignKey.BookPrint(bookBorrowTracking.bookPrintId);
    await foreignKey.Reader(bookBorrowTracking.readerId);
    await foreignKey.Staff(bookBorrowTracking.staffId);
}

exports.create = async (bookBorrowTracking) => {
    await validateReference(bookBorrowTracking);

    const bookPrint = await models.BookPrint.findById(bookBorrowTracking.bookPrintId);
    if (bookPrint.readerReturnDate){
        return {message: "The printed book has been borrowed by another reader."};
    }
    if (bookPrint.documentType === "Document Read"){
        return {message: "The printed book is already in read state."};
    }

    reader = await models.Reader.findById(bookBorrowTracking.readerId);
    if (reader.currentNumberOfBooksBorrowed == reader.maximumNumberOfBooksBorrowed ){
        return {message: "The reader has reached the maximum number of books borrowed."};
    }


    try {
        const result = await models.BookBorrowTracking.create(bookBorrowTracking);
        if (result) {
            const bookBorrowRgistration = await models.BookBorrowRegistration.findOne({
                bookPrintId: bookBorrowTracking.bookPrintId,
                readerId: bookBorrowTracking.readerId,
            })
            console.log(bookBorrowRgistration);
            if (bookBorrowRgistration){
                await models.BookBorrowRegistration.findByIdAndDelete(bookBorrowRgistration._id);
            }
            bookPrint.readerReturnDate = result.dueDate;
            await bookPrint.save();

            reader.currentNumberOfBooksBorrowed += 1;
            await reader.save();
        }
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findAll = async () => {
    try {
        const result = await models.BookBorrowTracking.find();
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findByReader = async (readerId) => {
    try {
        const result = await models.BookBorrowTracking.find({ readerId: readerId });
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findOverdueBooksByReader = async (readerId) => {
    await foreignKey.Reader(readerId);
    try {
        const overdueBooks = await models.BookBorrowTracking.find({
            readerId,                
            dueDate: { $lt: new Date() }, 
            returnedDate: null
        })
        return overdueBooks;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findOverdueBooks = async () => {
    try {
        const overdueBooks = await models.BookBorrowTracking.find({
            dueDate: { $lt: new Date() }, 
            returnedDate: null
        })
        return overdueBooks;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
};

exports.returnBook = async (readerId, bookPrintId) => {
    await foreignKey.Reader(readerId);
    await foreignKey.BookPrint(bookPrintId);
    try {
        const bookBorrowTracking = await models.BookBorrowTracking.findOne({
            bookPrintId: bookPrintId,
            readerId: readerId,
        })
        console.log(bookBorrowTracking);
        if (!bookBorrowTracking) {
            return {message: "The book borrow tracking does not exist."};
        }
        bookBorrowTracking.returnedDate = Date.now();
        await bookBorrowTracking.save();

        const bookPrint = await models.BookPrint.findById(bookPrintId);
        bookPrint.readerReturnDate = null;
        await bookPrint.save();

        const reader = await models.Reader.findById(readerId);
        reader.currentNumberOfBooksBorrowed -= 1;
        await reader.save();

        return {message: "Book has been returned"};
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.renewBook = async (readerId, bookPrintId) => {
    await foreignKey.Reader(readerId);
    await foreignKey.BookPrint(bookPrintId);
    try {
        const bookBorrowTracking = await models.BookBorrowTracking.findOne({
            readerId: readerId,
            bookPrintId: bookPrintId,
        });
        if (!bookBorrowTracking) {
            return {message: "The book borrow tracking does not exist."};
        }
        bookBorrowTracking.dueDate = new Date(bookBorrowTracking.dueDate.getTime() + 7 * 24 * 60 * 60 * 1000);
        console.log(bookBorrowTracking.dueDate)
        await bookBorrowTracking.save();
        
        const bookPrint = await models.BookPrint.findById(bookPrintId);
        bookPrint.readerReturnDate = bookBorrowTracking.dueDate;
        await bookPrint.save();
        return {message: "Book print has been renewed"};
    }
    catch (error) {
        throw err.errorFormat(error);
    }
} 

exports.delete = async (id) => {
    try {
        const result = await models.BookBorrowTracking.findByIdAndDelete(id);
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}