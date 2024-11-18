const services = require('../../services/index.service');

exports.create = async (req, res, next) => {
    try {
        const data = await services.BookPurchaseRegistration.create(req.body);
        res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const data = await services.BookPurchaseRegistration.findAll();
        res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.findByReader = async (req, res, next) => {
    try {
        const data = await services.BookPurchaseRegistration.findByReader(req.query.readerId);
        if (!data) {
            return res.status(404).json({ message: 'Book purchase registration not found' });
        }
        res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.updateState = async (req, res, next) => {
    try {
        const data = await services.BookPurchaseRegistration.updateState(req.params.id, req.body.newState);
        if (!data) {
            return res.status(404).json({ message: 'Book purchase registration not found' });
        }
        res.send({ message: 'Book purchase registration updated' });
    }
    catch (error) {
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const data = await services.BookPurchaseRegistration.delete(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Book purchase registration not found' });
        }
        res.send({ message: 'Book purchase registration deleted successfully' });
    }
    catch (error) {
        next(error);
    }
}