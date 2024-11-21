const express = require('express');

const controllers = require('../../controllers/index.controller');

const router = express.Router();

router.route('/')
    .get(controllers.Reader.findAll)
    .post(controllers.Reader.create)

router.route('/:id')
    .get(controllers.Reader.findOne)
    .put(controllers.Reader.update)
    .delete(controllers.Reader.delete);

router.route('/search')
    .post(controllers.Reader.findByPublicId);


module.exports = router;