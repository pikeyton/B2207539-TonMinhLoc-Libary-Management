const models = require('../../models/index.model.js')
const ApiError = require('../../utils/api.error.util.js');
const err = require('../../utils/service.error.util.js');
const mongoose = require('mongoose');

exports.create = async (author) => {
    try {
        const result = await models.Author.create(author);
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
};

exports.findByName = async (name) => {
    if (!name) {
        throw new ApiError(400, "Name parameter is required");
    }
    try {
        const result = await models.Author.find({ name: { $regex: name, $options: "i" }});
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
};
exports.findOne = async (id) => {
    try {
        const result = await models.Author.findById(id);
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findAll = async () => {
    try {
        const result = await models.Author.find();
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.update = async (id, author) => {
    try {
        const result = await models.Author.findByIdAndUpdate(id, author, { new: true, runValidators: true });
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.delete = async (id) => {
    const books = await models.Book.find({ authorIds: { $in: [id] } });

    if (books.length !== 0) {
        throw new ApiError(400, "Không thể xóa tác giả khi có sách của tác giả này.");
    }

    try {
        const result = await models.Author.findByIdAndDelete(id);
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}