const express = require('express');

const controllers = require('../../controllers/index.controller')

const router = express.Router();

router.route('/')
    .get(controllers.BookBorrowRegistration.findAll)
    .post(controllers.BookBorrowRegistration.create);


router.route('/search')
    .get(controllers.BookBorrowRegistration.findByReader);

router.route('/:id')
    .delete(controllers.BookBorrowRegistration.delete);

module.exports = router;