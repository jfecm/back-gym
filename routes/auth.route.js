const express = require("express");
const router = express.Router();
const authCtrl = require('./../controllers/auth.controller');

router.post('/sign-in', authCtrl.signIn);
router.post('/sign-up', authCtrl.signUp);

module.exports = router;
