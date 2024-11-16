models = require('../../models/index.model');
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
        if (result && result.readerIdOwn){
            const reader = await models.Reader.findById(result.readerIdOwn);
            if (reader.maximumNumberOfBooksBorrowed <= 10)
                reader.maximumNumberOfBooksBorrowed += 1;
            await reader.save();
        }
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
        const result = await models.BookPrint.find({ bookId: { $regex: bookId, options: "i"}});
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
        console.log(result);
        if (result){
            if (bookPrintOld.readerIdOwn != result.readerIdOwn){
                if (bookPrintOld.readerIdOwn){
                    const readerOld = await models.Reader.findById(bookPrintOld.readerIdOwn);
                    if (readerOld.maximumNumberOfBooksBorrowed > 0)
                        readerOld.maximumNumberOfBooksBorrowed -= 1;
                    await readerOld.save();
                }
                if (result.readerIdOwn){
                    const readerNew = await models.Reader.findById(result.readerIdOwn);
                    if (readerNew.maximumNumberOfBooksBorrowed <= 10)
                        readerNew.maximumNumberOfBooksBorrowed += 1;
                    await readerNew.save();
                }
            }
        }
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.delete = async (id) => {
    try {
        const result = await models.BookPrint.findByIdAndDelete(id);
        if (result && result.readerIdOwn){
            const reader = await models.Reader.findById(result.readerIdOwn);
            if (reader.maximumNumberOfBooksBorrowed > 0)
                reader.maximumNumberOfBooksBorrowed -= 1;
            await reader.save();
        }
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}