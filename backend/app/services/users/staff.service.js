const models = require('../../models/index.model.js')
const err = require('../../utils/service.error.util.js');

exports.create = async (staff) => {
    try {
        const result = await models.Staff.create(staff);
        return result;
    }
    catch (error) {
        console.log(error);
        throw err.errorFormat(error);
    }
}

exports.findAll = async () => {
    try {
        const result = await models.Staff.find();
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.findByPublicId = async (publicId) => {
    try {
        const result = await models.Staff.find({ publicId: {$regex: publicId, $options: "i"} });
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}


exports.findByEmail = async (email) => {
    try {
        const result = await models.Staff.find({ email: {$regex: email, $options: "i"} });
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.update = async (id, staff) => {
    try {
        const result = await models.Staff.findByIdAndUpdate(id, staff, {new: true, runValidators: true});
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}

exports.delete = async (id) => {
    try {
        const result = await models.Staff.findByIdAndDelete(id);
        return result;
    }
    catch (error) {
        throw err.errorFormat(error);
    }
}