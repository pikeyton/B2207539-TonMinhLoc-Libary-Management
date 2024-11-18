const express = require('express');

const controllers = require('../../controllers/index.controller');

const router = express.Router();

router.route('/')
    .get(controllers.Publisher.findAll)
    .post(controllers.Publisher.create);

router.route('/:id')
    .get(controllers.Publisher.findOne)
    .put(controllers.Publisher.update)
    .delete(controllers.Publisher.delete);

module.exports = router;