const express = require('express');
const controllers = require('../../controllers/index.controller');
const auth = require('../../utils/auth.util');

const router = express.Router();

router.route('/')
    .post(controllers.BookPrint.create);


router.route('/search')
    .post(controllers.BookPrint.findByBook);

router.route('/:id')
    .put(auth.staff, controllers.BookPrint.update)
    .delete(auth.staff, controllers.BookPrint.delete);

module.exports = router;