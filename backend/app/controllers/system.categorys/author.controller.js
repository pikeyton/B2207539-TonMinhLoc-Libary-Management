const mongoose = require('mongoose');
const services = require('../../services/index.service.js')
const ApiError = require('../../utils/api.error.util.js');


exports.create = async (req, res, next) => {
    try {
        const data = await services.Author.create(req.body);
        res.status(201).json({
            message: 'Author created successfully',
            data: data,
        });
    }
    catch (error) {
        console.error(error);
        next(error);
    }
};

exports.findByName = async (req, res, next) => {
    try {
        const data = await services.Author.findByName(req.query.name);
        if (!data) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.findOne = async (req, res, next) => {
    try {
        const data = await services.Author.findOne(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const data = await services.Author.findAll();
        res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const data = await services.Author.update(req.params.id, req.body);
        if (!data) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.send({ message: 'Author updated successfully' });
    }
    catch (error) {
        next(error);
    }
}


exports.delete = async (req, res, next) => {
    try {
        const data = await services.Author.delete(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.send({ message: 'Author deleted successfully' });
    }
    catch (error) {
        next(error);
    }
}

