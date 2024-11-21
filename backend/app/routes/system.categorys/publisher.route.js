const express = require('express');

const controllers = require('../../controllers/index.controller');
const auth = require('../../utils/auth.util');

const router = express.Router();

router.route('/')
    .get(controllers.Publisher.findAll)
    .post(controllers.Publisher.create);

router.route('/:id')
    .get(controllers.Publisher.findOne)
    .put(auth.staff, controllers.Publisher.update)
    .delete(auth.staff, controllers.Publisher.delete);

module.exports = router;