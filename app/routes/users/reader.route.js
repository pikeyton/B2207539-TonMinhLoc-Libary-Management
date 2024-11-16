const express = require('express');

const controllers = require('../../controllers/index.controller');

const router = express.Router();

router.route('/')
    .get(controllers.Reader.findAll)
    .post(controllers.Reader.create)

router.route('/:id')
    .put(controllers.Reader.update)
    .delete(controllers.Reader.delete);

router.route('/search')
    .get(controllers.Reader.findByPublicId);


module.exports = router;