const express = require('express');
const controller = require('../../controllers/index.controller');

const router = express.Router();

router.route('/register/staff').post(controller.Auth.registerStaff);
router.route('/register/reader').post(controller.Auth.registerReader);
router.route('/login').post(controller.Auth.login);
router.route('/logout').post(controller.Auth.logout);

module.exports = router;