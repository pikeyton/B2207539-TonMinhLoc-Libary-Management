const models = require('../../models/index.model');
const err = require('../../utils/service.error.util');
const foreignKeys = require('../../utils/foreignKey.util.js');

async function validateReference(bookPurchaseRegistration) {
    await foreignKeys.Book(bookPurchaseRegistration.bookId);
    await foreignKeys.Reader(bookPurchaseRegistration.readerId);
}

exports.create = async (bookPurchaseRegistration) => {
    await validateReference(bookPurchaseRegistration);
    const mySignUp = await models.BookPurchaseRegistration.findOne({
        readerId: bookPurchaseRegistration.readerId,
        bookId: bookPurchaseRegistration.bookId
    })
    if (mySignUp) {
        return { message: "The reader has already registered for this book." };
    }
    try {
        const result = await models.BookPurchaseRegistration.create(bookPurchaseRegistration);
        return result;
    } catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findAll = async () => {
    try {
        const result = await models.BookPurchaseRegistration.find();
        return result;
    } catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findByReader = async (readerId) => {
    try {
        const result = await models.BookPurchaseRegistration.find({ readerId: readerId });
        return result;
    } catch (error) {
        throw err.errorFormat(error);
    }
}

exports.updateState = async (id, newState) => {
    try {
        console.log(newState);
        const bookPurchaseRegistration = await models.BookPurchaseRegistration.findByIdAndUpdate(id, { state: newState }, { new: true , runValidators: true});
        console.log(bookPurchaseRegistration);
        return bookPurchaseRegistration;
    } catch (error) {
        throw err.errorFormat(error);
    }
}

exports.delete = async (id) => {
    try {
        const result = await models.BookPurchaseRegistration.findByIdAndDelete(id);
        return result;
    } catch (error) {
        throw err.errorFormat(error);
    }
}