const express = require('express');
const controllers = require('../../controllers/index.controller');
const auth = require('../../utils/auth.util');

const router = express.Router();

router.route('/')
    .get(controllers.BookField.findAll)
    .post(controllers.BookField.create);

router.route('/:id')
    .get(controllers.BookField.findOne)
    .put(auth.staff, controllers.BookField.update)
    .delete(auth.staff, controllers.BookField.delete);

module.exports = router;