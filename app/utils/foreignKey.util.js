const models = require('../models/index.model')
const Author = models.Author;
const Book = models.Book;
const BookField = models.BookField;
const Publisher = models.Publisher;
const ApiError = require('./api.error.util')
const mongoose = require('mongoose');
const obj = mongoose.Types.ObjectId;

exports.Author = async (ids) => {
    for (const id of ids) {
        if (!obj.isValid(id)){
            throw new ApiError(404, `Author Id does not exist`);
        }
        const idExists = await Author.exists({ _id: id});
        if (!idExists) {
            throw new ApiError(404, `Author Id does not exist`);
        }
    }
}

exports.BookField = async (id) => {
    if (!obj.isValid(id)){
        throw new ApiError(404, `Author Id does not exist`);
    }
    const idExists = await BookField.exists({ _id: id});
    if (!idExists || !obj.isValid(id)) {
        throw new ApiError(404, `Book field Id does not exist`);
    }
}

exports.Publisher = async (id) => {
    if (!obj.isValid(id)){
        throw new ApiError(404, `Author Id does not exist`);
    }
    const idExists = await Publisher.exists({ _id: id});
    if (!idExists || !obj.isValid(id)) {
        throw new ApiError(404, `Publisher Id ${id} does not exist`);
    }
}