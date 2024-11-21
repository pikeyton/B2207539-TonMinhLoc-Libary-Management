const services = require('../../services/index.service');
const hashPassword = require('../../utils/hashPassword.util');

exports.create = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (await services.Reader.findByEmail(email)){
            return res.status(409).json({ message: 'Email already exists' });
        }
        const body = {...req.body};
        body.password = await hashPassword.hashPassword(password);
        const data = await services.Reader.create(body);
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

exports.findOne = async (req, res, next) => {
    try {
        const data = await services.Reader.findOne(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Reader not found' });
        }
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.findByPublicId = async (req, res, next) => {
    try {
        const data = await services.Reader.findByPublicId(req.body.publicId);
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
        res.send({
            message: 'Reader updated successfully',
            data: data,
        });

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