const express = require('express');

const controllers = require('../../controllers/index.controller');

const router = express.Router();

router.route('/')
    .get(controllers.BookPurchaseRegistration.findAll)
    .post(controllers.BookPurchaseRegistration.create);

router.route('/search')
    .get(controllers.BookPurchaseRegistration.findByReader);

router.route('/:id')
    .put(controllers.BookPurchaseRegistration.updateState)
    .delete(controllers.BookPurchaseRegistration.delete);


module.exports = router;