const express = require('express');

const controllers = require('../../controllers/index.controller')

const auth = require('../../utils/auth.util');

const router = express.Router();

router.route('/')
    .get(auth.staff, controllers.BookBorrowRegistration.findAll)
    .post(auth.reader, controllers.BookBorrowRegistration.create);

router.route('/search/:readerId')
    .get(controllers.BookBorrowRegistration.findByReader);

router.route('/:id')
    .delete(controllers.BookBorrowRegistration.delete);

module.exports = router;