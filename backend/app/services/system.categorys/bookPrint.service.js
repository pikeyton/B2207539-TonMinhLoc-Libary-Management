const models = require('../../models/index.model');
const err = require('../../utils/service.error.util.js');
const foreignKeys = require('../../utils/foreignKey.util.js');

async function validateReference(bookPrint){
    await foreignKeys.Book(bookPrint.bookId);
    if (bookPrint.readerIdOwn){
        await foreignKeys.Reader(bookPrint.readerIdOwn);
    }
}

exports.create = async (bookPrint) =>{
    await validateReference(bookPrint);
    try {
        const result = await models.BookPrint.create(bookPrint);
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
};

exports.findOne = async (id) => {
    try {
        const result = await models.BookPrint.findById(id);
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findAll = async () => {
    try {
        const result = await models.BookPrint.find();
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findByBook = async (bookId) => {
    try {
        const result = await models.BookPrint.find({ bookId: bookId});
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.update = async (id, bookPrint) => {
    await validateReference(bookPrint);
    try {
        const bookPrintOld = await models.BookPrint.findById(id);
        const result = await models.BookPrint.findByIdAndUpdate(id, bookPrint, { new: true, runValidators: true });
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.delete = async (id) => {
    try {
        const result = await models.BookPrint.findByIdAndDelete(id);
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}