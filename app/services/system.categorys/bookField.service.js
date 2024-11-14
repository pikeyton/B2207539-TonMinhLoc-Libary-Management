const models = require('../../models/index.model.js')
const ApiError = require('../../utils/api.error.util.js');
const mongoose = require('mongoose');
const obj = mongoose.Types.ObjectId;
const err = require('../../utils/service.error.util.js');

exports.create = async (bookField) =>{
    try {
        const result = await models.BookField.create(bookField);
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findOne = async (id) => {
    if (!obj.isValid(id)){
        throw new ApiError(404, 'Book field not found');
    }
    try {
        const result = await models.BookField.findById(id);
        return result;
    }
    catch (error) {
        throw new ApiError(500, error.message);
    }
}

exports.findAll = async () => {
    try {
        const result = await models.BookField.find();
        return result;
    }
    catch (error) {
        throw new ApiError(500, error.message);
    }
}


exports.update = async (id, bookFieldData) => {
    if (!obj.isValid(id)){
        throw new ApiError(404, 'Book field not found');
    }
    if (bookFieldData.number) {
        throw new ApiError(404, 'Number field not changed');
    }
    try {
        const result = await models.BookField.findByIdAndUpdate(id, bookFieldData, { new: true, runValidators: true });
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.delete = async (id) => {
    if (!obj.isValid(id)){
        throw new ApiError(404, 'Book field not found');
    }
    try {
        const result = await models.BookField.findByIdAndDelete(id);
        return result;
    }
    catch (error) {
        throw new ApiError(500, error.message);
    }
}