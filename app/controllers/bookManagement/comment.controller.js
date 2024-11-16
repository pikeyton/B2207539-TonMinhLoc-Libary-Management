const services = require('../../services/index.service');

exports.create = async (req, res, next) => {
    try {
        const data = await services.Comment.create(req.body);
        res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.findByBook = async (req, res, next) => {
    try {
        const data = await services.Comment.findByBook(req.body.bookId);
        res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const data = await services.Comment.update(req.params.id, req.body);
        if (!data) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.send({message: 'Comment updated'});
    }
    catch (error) {
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const data = await services.Comment.delete(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.send({ message: 'Comment deleted successfully' });
    }
    catch (error) {
        next(error);
    }
}

