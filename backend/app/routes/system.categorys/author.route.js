const express = require('express');
const controllers = require('../../controllers/index.controller');

const auth = require('../../utils/auth.util');

const router = express.Router();

router.route('/')
    .get(controllers.Author.findAll)
    .post(auth.staff, controllers.Author.create);


router.route('/search')
    .get(controllers.Author.findByName);

router.route('/:id')
    .get(controllers.Author.findOne)
    .put(auth.staff, controllers.Author.update)
    .delete(auth.staff, controllers.Author.delete);

module.exports = router;