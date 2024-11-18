const models = require('../../models/index.model.js')
const err = require('../../utils/service.error.util.js');

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
    try {
        const result = await models.Publisher.findById(id);
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findAll = async () => {
    try {
        const result = await models.Publisher.find();
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.update = async (id, publisherData) => {
    try {
        const result = await models.Publisher.findByIdAndUpdate(id, publisherData, { new: true, runValidators: true });
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.delete = async (id) => {
    try {
        const result = await models.Publisher.findByIdAndDelete(id);
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}