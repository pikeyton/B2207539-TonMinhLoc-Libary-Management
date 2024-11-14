const services = require('../../services/index.service.js');
const ApiError = require('../../utils/api.error.util.js');

exports.create = async (req, res, next) => {
    try {
        const data = await services.BookField.create(req.body);
        return res.status(201).json({
            message: 'Book field created successfully',
            data: data,
        });
    }
    catch (error) {
        next(error);
    }
}

exports.findOne = async (req, res, next) => {
    try {
        const data = await services.BookField.findOne(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Book field not found' });
        }
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const data = await services.BookField.findAll();
        if (!data) {
            return res.send({ message: 'Book field not found' });
        }
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const data = await services.BookField.update(req.params.id, req.body);
        if (!data){
            return new ApiError(404, 'Book field not found');
        }
        return res.send({ message: 'Book field updated successfully' });
    }
    catch (error) {
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const data = await services.BookField.delete(req.params.id);
        if (!data){
            return new ApiError(404, 'Book field not found');
        }
        return res.send({ message: 'Book field deleted successfully'} );
    }
    catch (error) {
        next(error);
    }
}