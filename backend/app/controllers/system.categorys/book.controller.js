const mongoose = require('mongoose');
const services = require('../../services/index.service.js')
const ApiError = require('../../utils/api.error.util.js');

exports.create = async (req, res, next) => {
    try {
        const data = await services.Book.create(req.body);
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
        const data = await services.Book.findOne(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Book field not found' });
        }
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.findByName = async (req, res, next) => {
    try {
        const data = await services.Book.findByName(req.query.name);
        if (!data) {
            return res.status(404).json({ message: 'Book field not found' });
        }
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.findByPublicId = async (req, res, next) => {
    try {
        const data = await services.Book.findByPublicId(req.query.publicId);
        if (!data) {
            return res.status(404).json({ message: 'Book field not found' });
        }
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.findByTopic = async (req, res, next) => {
    try {
        const data = await services.Book.findByTopic(req.query.topic);
        if (!data) {
            return res.status(404).json({ message: 'Book fields not found' });
        }
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.findByAuthor = async (req, res, next) => {
    try {
        const data = await services.Book.findByAuthor(req.query.author);
        if (!data) {
            return res.status(404).json({ message: 'Book fields not found' });
        }
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const data = await services.Book.findAll();
        if (!data) {
            return res.send({ message: 'Book fields not found' });
        }
        return res.json(data);
    }
    catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const data = await services.Book.update(req.params.id, req.body);
        if (!data) {
            return res.status(404).json({ message: 'Book field not found' });
        }
        return res.send({ message: 'Book field updated successfully' });
    }
    catch (error) {
        next(error);
    }
}

exports.delete = async (req, res, next) => {
    try {
        const data = await services.Book.delete(req.params.id);
        if (!data) {
            return res.status(404).json({ message: 'Book field not found' });
        }
        return res.send({ message: 'Book field deleted successfully' });
    }
    catch (error) {
        next(error);
    }
}