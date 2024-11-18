const express = require('express');
const controllers = require('../../controllers/index.controller');

const router = express.Router();

router.route('/')
    .post(controllers.BookPrint.create);


router.route('/:bookId')
    .get(controllers.BookPrint.findByBook);

router.route('/:id')
    .put(controllers.BookPrint.update)
    .delete(controllers.BookPrint.delete);

module.exports = router;