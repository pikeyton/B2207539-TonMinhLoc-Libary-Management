const models = require('../../models/index.model.js')
const ApiError = require('../../utils/api.error.util.js');
const foreignKeys = require('../../utils/foreignKey.util.js');
const err = require('../../utils/service.error.util.js');
const mongoose = require('mongoose');
const obj = mongoose.Types.ObjectId;

async function validateReference(book){
    await foreignKeys.Author(book.authorIds);
    await foreignKeys.BookField(book.bookFieldId);
    await foreignKeys.Publisher(book.publisherId);
}

exports.create = async (book) => {
    await validateReference(book);
    try {
        const result = await models.Book.create(book);
        return result;
    }
    catch (error) {
        err.errorFormat(error);
    }
}

exports.findOne = async (id) => {
    if (!obj.isValid(id)){
        throw new ApiError(404, 'Book not found');
    }
    try {
        console.log(id);
        const result = await models.Book.findById(id);
        return result;
    }
    catch (error) {
        throw new ApiError(500, error.message);
    }
}

exports.findByName = async (name) => {
    try {
        const result = await models.Book.findOne({name: {$regex: name, $opitions: "i" }});
        return result;
    }
    catch (error) {
        throw new ApiError(500, error.message);
    }
}

exports.findByPublicId = async (publicId) => {
    try {
        const result = await models.Book.findOne({publicId: {$regex: publicId, $opitions: "i"}});
        return result;
    }
    catch (error) {
        throw new ApiError(500, error.message);
    }
}

exports.findByTopic = async (topic) => {
    try {
        const result = await models.Book.find({topics: {$regex: new RegExp(topic, "i")}});
        return result;
    }
    catch (error) {
        throw new ApiError(500, error.message);
    }
}

exports.findByAuthor = async (authorName) => {
    try {
        const authors = await models.Author.find({ name: new RegExp(authorName, 'i') });
        const authorIds = authors.map(author => author._id);
        const result = await models.Book.find({ authorIds: { $in: authorIds } }).populate('authorIds');
        return result;
    }
    catch (error) {
        throw new ApiError(500, error.message);
    }
}

exports.findAll = async () => {
    try {
        const result = await models.Book.find();
        return result;
    }
    catch (error) {
        throw new ApiError(500, error.message);
    }
}

exports.update = async (id, book) => {
    validateReferences(book);
    if (!obj.isValid(id)){
        throw new ApiError(404, 'Book not found');
    }
    try {
        const result = await models.Book.findByIdAndUpdate(id, book, {new: true});
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.delete = async (id) => {
    if (!obj.isValid(id)){
        throw new ApiError(404, 'Book not found');
    }
    try {
        const result = await models.Book.findByIdAndDelete(id);
        return result;
    }
    catch (error) {
        throw new ApiError(500, error.message);
    }
}

