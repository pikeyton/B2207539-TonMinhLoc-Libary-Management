const express = require('express');
const controllers = require('../../controllers/index.controller');
const router = express.Router();

router.route('/')
    .get(controllers.Book.findAll)
    .post(controllers.Book.create);

router.route('/search/name')
    .get(controllers.Book.findByName);

router.route('/search/publicId')
    .get(controllers.Book.findByPublicId);

router.route('/search/topic')
    .get(controllers.Book.findByTopic);

router.route('/search/author')
    .get(controllers.Book.findByAuthor);

router.route('/:id')
    .get(controllers.Book.findOne)
    .put(controllers.Book.update)
    .delete(controllers.Book.delete);

module.exports = router;