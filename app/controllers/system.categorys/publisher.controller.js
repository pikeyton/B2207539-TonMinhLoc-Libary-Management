const services = require('../../services/index.service');
const ApiError = require('../../utils/api.error.util')

exports.create = async (req, res, next) => {
    try {
        const data = await services.Publisher.create(req.body);
        return res.status(201).json({
            message: 'Book created successfully',
            data: data,
        });
    }
    catch (error) {
        next(error);
    }
}

exports.findOne = async (req, res, next) => {
    try {
        const data = await services.Publisher.findOne(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const data = await services.Publisher.findAll();
        if (!data) {
            return res.send({ message: 'Books not found' });
        }
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const data = await services.Publisher.update(req.params.id, req.body);
        if (!data){
            return new ApiError(404, 'Book not found');
        }
        return res.send({ message: 'Book updated successfully' });
    }
    catch (error) {
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const data = await services.Book.delete(req.params.id);
        if (!data){
            return new ApiError(404, 'Book not found');
        }
        return res.send({ message: 'Book deleted successfully'} );
    }
    catch (error) {
        next(error);
    }
}