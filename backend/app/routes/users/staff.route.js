const express = require('express');

const controllers = require('../../controllers/index.controller');

const router = express.Router();

router.route('/')
    .get(controllers.Staff.findAll)
    .post(controllers.Staff.create)

router.route('/:id')
    .get(controllers.Staff.findOne)
    .put(controllers.Staff.update)
    .delete(controllers.Staff.delete);

router.route('/search')
    .get(controllers.Staff.findByPublicId);


module.exports = router;