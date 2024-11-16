const services = require('../../services/index.service');

exports.create = async (req, res, next) => {
    try {
        const data = await services.Staff.create(req.body);
        res.status(201).json({
            message: 'Staff created successfully',
            data: data,
        });
    } catch (error) {
        next(error);
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const data = await services.Staff.findAll();
        res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.findByPublicId = async (req, res, next) => {
    try {
        const data = await services.Staff.findByPublicId(req.query.publicId);
        if (!data) {
            return res.status(404).json({ message: 'Staff not found' });
        }
        res.json(data);
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const data = await services.Staff.update(req.params.id, req.body);
        if (!data) {
            return res.status(404).json({message: 'Staff not found'});
        }
        res.send({message: 'Staff updated successfully'});

    } catch (error) {
        next(error);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const data = await services.Staff.delete(req.params.id);
        if (!data) {
            return res.status(404).json({message: 'Staff not found'});
        }
        res.send({message: 'Staff deleted successfully'});
    } catch (error) {
        next(error);
    }
}