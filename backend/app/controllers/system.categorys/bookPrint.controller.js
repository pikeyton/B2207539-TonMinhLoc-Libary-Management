const services = require('../../services/index.service');
const models = require('../../models/index.model');

exports.create = async (req, res, next) => {
    try {
        const data = await services.BookPrint.create(req.body);
        return res.status(201).json({
            message: 'Book print created successfully',
            data: data,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.findByBook = async (req, res, next) => {
    try {
        const data = await services.BookPrint.findByBook(req.body.bookId);
        res.json(data);
    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const data = await services.BookPrint.update(req.params.id, req.body);
        if (!data) {
            return res.status(404).json({ message: 'Book print not found' });
        }
        return res.send({ message: 'Book updated successfully' });
    } catch (error) {
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const data = await services.BookPrint.delete(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Book print not found' });
        }
        return res.send({ message: 'Book deleted successfully' });
    } catch (error) {
        next(error);
    }
}