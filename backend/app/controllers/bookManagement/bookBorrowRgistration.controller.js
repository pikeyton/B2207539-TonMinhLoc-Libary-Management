const services = require('../../services/index.service.js');

exports.create = async (req, res, next) => {
    try {
        const data = await services.BookBorrowRegistration.create(req.body);
        res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const data = await services.BookBorrowRegistration.findAll();
        res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.findByReader = async (req, res, next) => {
    try {
        const data = await services.BookBorrowRegistration.findByReader(req.params.readerId);
        if (!data) {
            return res.status(404).json({ message: 'Book borrow registration not found' });
        }
        res.json(data);
    }
    catch (error) {
        next(error);
    }
}


exports.delete = async (req, res, next) => {
    try {
        const data = await services.BookBorrowRegistration.delete(req.params.id);
        res.send({ message: 'Book borrow registration deleted successfully' });
    }
    catch (error) {
        next(error);
    }
}
