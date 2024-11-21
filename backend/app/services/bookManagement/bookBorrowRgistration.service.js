const models = require('../../models/index.model.js')
const ApiError = require('../../utils/api.error.util.js');
const err = require('../../utils/service.error.util.js');
const foreignKeys = require('../../utils/foreignKey.util.js');

async function validateReference(bookBorrowRegistration){
    await foreignKeys.BookPrint(bookBorrowRegistration.bookPrintId);
    await foreignKeys.Reader(bookBorrowRegistration.readerId);
}

exports.create = async (bookBorrowRegistration) => {
    await validateReference(bookBorrowRegistration);
    
    bookPrint = await models.BookPrint.findById(bookBorrowRegistration.bookPrintId);
    if (bookPrint.readerReturnDate){
        return {message: "The printed book has been borrowed by another reader."};
    }
    if (bookPrint.documentType === "Document Read"){
        return {message: "The printed book is already in read state."};
    }

    reader = await models.Reader.findById(bookBorrowRegistration.readerId);
    const numberOfRegistrations = await models.BookBorrowRegistration.countDocuments({ readerId: bookBorrowRegistration.readerId });
    if (numberOfRegistrations + reader.currentNumberOfBooksBorrowed >= reader.maximumNumberOfBooksBorrowed ){
        return {message: "The reader has reached the maximum number of books borrowed and is checking out."};
    }

    const mySignUp = await models.BookBorrowRegistration.findOne({
        readerId: bookBorrowRegistration.readerId,
        bookPrintId: bookBorrowRegistration.bookPrintId,
    });
    if (mySignUp){
        return {message: "The reader has already borrowed this book."};
    }

    const yourSignUp = await models.BookBorrowRegistration.findOne({bookPrintId: bookBorrowRegistration.bookPrintId});
    if (yourSignUp){
        return {message: "The book is already registration borrowed by another reader."};
    }
    
    try {
        const result = await models.BookBorrowRegistration.create(bookBorrowRegistration);
        return {
            message: 'Book borrow registration created successfully',
            data: result,
        };
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findAll = async () => {
    try {
        const result = await models.BookBorrowRegistration.find();
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findByReader = async (readerId) => {
    try {
        const result = await models.BookBorrowRegistration.find({ readerId: readerId })
        .populate("readerId") 
        .populate({
            path: "bookPrintId",
            populate: {
              path: "bookId", 
              select: [
                "name", "publicId",
              ],  
            }
          });;
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.delete = async (id) => {
    try {
        const result = await models.BookBorrowRegistration.findByIdAndDelete(id);
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}