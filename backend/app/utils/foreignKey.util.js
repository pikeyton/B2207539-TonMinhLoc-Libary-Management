const models = require('../models/index.model')
const ApiError = require('./api.error.util')
const mongoose = require('mongoose');
const obj = mongoose.Types.ObjectId;

exports.Author = async (ids) => {
    for (const id of ids) {
        if (!obj.isValid(id)){
            throw new ApiError(404, `Author Id does not exist`);
        }
        const idExists = await models.Author.exists({ _id: id});
        if (!idExists) {
            throw new ApiError(404, `Author Id does not exist`);
        }
    }
}

exports.BookField = async (id) => {
    if (!obj.isValid(id)){
        throw new ApiError(404, `Book field id does not exist`);
    }
    const idExists = await models.BookField.exists({ _id: id});
    if (!idExists || !obj.isValid(id)) {
        throw new ApiError(404, `Book field id does not exist`);
    }
}

exports.Publisher = async (id) => {
    if (!obj.isValid(id)){
        throw new ApiError(404, `Publisher id does not exist`);
    }
    const idExists = await models.Publisher.exists({ _id: id});
    if (!idExists || !obj.isValid(id)) {
        throw new ApiError(404, `Publisher id ${id} does not exist`);
    }
}

exports.Book = async (id) => {
    if (!obj.isValid(id)){
        throw new ApiError(404, `Book id does not exist`);
    }
    const idExists = await models.Book.exists({ _id: id});
    if (!idExists ||!obj.isValid(id)) {
        throw new ApiError(404, `Book id ${id} does not exist`);
    }
};

exports.BookPrint = async (id) => {
    if (!obj.isValid(id)){
        throw new ApiError(404, `Book print id does not exist`);
    }
    const idExists = await models.BookPrint.exists({ _id: id});
    if (!idExists ||!obj.isValid(id)) {
        throw new ApiError(404, `Book irint id ${id} does not exist`);
    }
}

exports.Reader = async (id) => {
    if (!obj.isValid(id)){
        throw new ApiError(404, `Reader Id does not exist`);
    }
    const idExists = await models.Reader.exists({ _id: id});
    if (!idExists ||!obj.isValid(id)) {
        throw new ApiError(404, `Reader Id does not exist`);
    }
}

exports.Staff = async (id) => {
    if (!obj.isValid(id)){
        throw new ApiError(404, `Staff Id does not exist`);
    }
    const idExists = await models.Staff.exists({ _id: id});
    if (!idExists ||!obj.isValid(id)) {
        throw new ApiError(404, `Staff Id ${id} does not exist`);
    }
}