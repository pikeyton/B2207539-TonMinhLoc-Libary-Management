const express = require('express');

const controllers = require('../../controllers/index.controller');

const router = express.Router();

router.route('/')
    .post(controllers.Comment.create)

router.route('/search')
    .post(controllers.Comment.findByBook);

router.route('/:id')
    .put(controllers.Comment.update)
    .delete(controllers.Comment.delete);


module.exports = router;