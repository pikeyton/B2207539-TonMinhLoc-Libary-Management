const models = require('../../models/index.model.js')
const ApiError = require('../../utils/api.error.util.js');
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
    try {
        const result = await models.BookField.findById(id);
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findAll = async () => {
    try {
        const result = await models.BookField.find();
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}


exports.update = async (id, bookFieldData) => {
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
    try {
        const result = await models.BookField.findByIdAndDelete(id);
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}