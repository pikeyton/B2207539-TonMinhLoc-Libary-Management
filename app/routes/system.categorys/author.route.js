const express = require('express');
const controllers = require('../../controllers/index.controller');

const router = express.Router();

router.route('/')
    .get(controllers.Author.findAll)
    .post(controllers.Author.create);


router.route('/search')
    .get(controllers.Author.findByName);

router.route('/:id')
    .get(controllers.Author.findOne)
    .put(controllers.Author.update)
    .delete(controllers.Author.delete);

module.exports = router;