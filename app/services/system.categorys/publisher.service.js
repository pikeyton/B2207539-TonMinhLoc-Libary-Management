const models = require('../../models/index.model.js')
const ApiError = require('../../utils/api.error.util.js');
const mongoose = require('mongoose');
const err = require('../../utils/service.error.util.js');
const obj = mongoose.Types.ObjectId;

exports.create = async (publisher) => {
    try {
        const result = await models.Publisher.create(publisher);
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findOne = async (id) => {
    if (!obj.isValid(id)){
        throw new ApiError(404, 'Publisher not found');
    }
    try {
        const result = await models.Publisher.findById(id);
        return result;
    }
    catch (error) {
        throw new ApiError(500, error.message);
    }
}

exports.findAll = async () => {
    try {
        const result = await models.Publisher.find();
        return result;
    }
    catch (error) {
        throw new ApiError(500, error.message);
    }
}

exports.update = async (id, publisherData) => {
    if (!obj.isValid(id)){
        throw new ApiError(404, 'Publisher not found');
    }
    try {
        const result = await models.Publisher.findByIdAndUpdate(id, publisherData, { new: true, runValidators: true });
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.delete = async (id) => {
    if (!obj.isValid(id)){
        throw new ApiError(404, 'Publisher not found');
    }
    try {
        const result = await models.Publisher.findByIdAndDelete(id);
        return result;
    }
    catch (error) {
        throw new ApiError(500, error.message);
    }
}