const express = require('express');
const autCtrl = require("../controllers/auth.controller");
const router = express.Router();
const authMiddleware = require('./../middlewares/authMiddleware');

router.use('/auth', require('./auth.route'));
router.use('/admin', autCtrl.verifyToken, authMiddleware.authorize(['admin']), require('./admin.route'));
router.use('/coach', autCtrl.verifyToken, authMiddleware.authorize(['admin', 'coach']), require('./coach.route'));
router.use('/member', autCtrl.verifyToken, require('./member.route'));
// TODO : router.use('/owner', require('./owner.route'));

module.exports = router;