const models = require('../../models/index.model.js')
const err = require('../../utils/service.error.util.js');

exports.create = async (reader) => {
    try {
        const result = await models.Reader.create(reader);
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findAll = async () => {
    try {
        const result = await models.Reader.find();
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findOne = async (id) => {
    try {
        const result = await models.Reader.findById(id);
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findByPublicId = async (publicId) => {
    try {
        const result = await models.Reader.findOne({ publicId: publicId });
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findByEmail = async (email) => {
    try {
        const result = await models.Reader.findOne({ email: {$regex: email, $options: "i"} });
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.update = async (id, reader) => {
    try {
        const result = await models.Reader.findByIdAndUpdate(id, reader, {new: true, runValidators: true});
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.delete = async (id) => {
    try {
        const result = await models.Reader.findByIdAndDelete(id);
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}