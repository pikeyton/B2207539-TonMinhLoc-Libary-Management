const express = require('express');

const controllers = require('../../controllers/index.controller');

const router = express.Router();

router.route('/')
    .get(controllers.BookBorrowTracking.findAll)
    .post(controllers.BookBorrowTracking.create);

router.route('/overdue')
    .get(controllers.BookBorrowTracking.findOverdueBooks)
    .post(controllers.BookBorrowTracking.findOverdueBooksByReader);

router.route('/searchReader/:id')
    .get(controllers.BookBorrowTracking.findByReader)

router.route('/bookPrint')
    .post(controllers.BookBorrowTracking.returnBook)

router.route('/bookRenew/:id')
    .put(controllers.BookBorrowTracking.renewBook);


router.route('/:id')
    .delete(controllers.BookBorrowTracking.delete);

module.exports = router;