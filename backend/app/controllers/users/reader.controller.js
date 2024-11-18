const services = require('../../services/index.service');

exports.create = async (req, res, next) => {
    try {
        const data = await services.Reader.create(req.body);
        res.status(201).json({
            message: 'Reader created successfully',
            data: data,
        });
    } catch (error) {
        next(error);
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const data = await services.Reader.findAll();
        res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.findByPublicId = async (req, res, next) => {
    try {
        const data = await services.Reader.findByPublicId(req.query.publicId);
        if (!data) {
            return res.status(404).json({ message: 'Reader not found' });
        }
        res.json(data);
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const data = await services.Reader.update(req.params.id, req.body);
        if (!data) {
            return res.status(404).json({message: 'Reader not found'});
        }
        res.send({message: 'Reader updated successfully'});

    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const data = await services.Reader.delete(req.params.id);
        if (!data) {
            return res.status(404).json({message: 'Reader not found'});
        }
        res.send({message: 'Reader deleted successfully'});
    } catch (error) {
        next(error);
    }
}