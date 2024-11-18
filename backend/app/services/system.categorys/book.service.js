const models = require('../../models/index.model.js');
const foreignKeys = require('../../utils/foreignKey.util.js');
const err = require('../../utils/service.error.util.js');

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
    try {
        console.log(id);
        const result = await models.Book.findById(id);
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findByName = async (name) => {
    try {
        const result = await models.Book.find({name: {$regex: name, $options: "i" }});
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findByPublicId = async (publicId) => {
    try {
        const result = await models.Book.find({publicId: {$regex: publicId, $options: "i"}});
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findByTopic = async (topic) => {
    try {
        const result = await models.Book.find({topics: {$regex: new RegExp(topic, "i")}});
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
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
        throw err.errorFormat(error);
    }
}

exports.findAll = async () => {
    try {
        const result = await models.Book.find();
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.update = async (id, book) => {
    await validateReference(book);
    try {
        const result = await models.Book.findByIdAndUpdate(id, book, {new: true, runValidators: true});
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.delete = async (id) => {
    try {
        const result = await models.Book.findByIdAndDelete(id);
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

