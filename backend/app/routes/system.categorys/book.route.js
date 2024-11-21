const express = require('express');
const controllers = require('../../controllers/index.controller');
const auth = require('../../utils/auth.util');
const upload = require('../../utils/uploadFile.util');
const router = express.Router();

router.route('/')
    .get(controllers.Book.findAll)
    .post(auth.staff,upload.singleUpload, controllers.Book.create);

router.route('/search/name')
    .get(controllers.Book.findByName);

router.route('/search/publicId')
    .get(controllers.Book.findByPublicId);

router.route('/search/author')
    .get(controllers.Book.findByAuthor);

router.route('/:id')
    .get(controllers.Book.findOne)
    .put(upload.singleUpload, controllers.Book.update)
    .delete(auth.staff, controllers.Book.delete);

module.exports = router;