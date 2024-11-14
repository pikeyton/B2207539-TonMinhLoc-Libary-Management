const express = require('express');
const controllers = require('../../controllers/index.controller');

const router = express.Router();

router.route('/')
    .get(controllers.BookField.findAll)
    .post(controllers.BookField.create);

router.route('/:id')
    .get(controllers.BookField.findOne)
    .put(controllers.BookField.update)
    .delete(controllers.BookField.delete);

module.exports = router;