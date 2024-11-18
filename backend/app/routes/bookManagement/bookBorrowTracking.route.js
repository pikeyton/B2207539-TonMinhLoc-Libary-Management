const express = require('express');

const controllers = require('../../controllers/index.controller');

const router = express.Router();

router.route('/')
    .get(controllers.BookBorrowTracking.findAll)
    .post(controllers.BookBorrowTracking.create);

router.route('/overdue')
    .get(controllers.BookBorrowTracking.findOverdueBooks)
    .post(controllers.BookBorrowTracking.findOverdueBooksByReader);

router.route('/search')
    .get(controllers.BookBorrowTracking.findByReader)

router.route('/book')
    .put(controllers.BookBorrowTracking.returnBook)
    .post(controllers.BookBorrowTracking.renewBook);

router.route('/:id')
    .delete(controllers.BookBorrowTracking.delete);

module.exports = router;