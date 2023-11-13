const express = require("express");
const router = express.Router();
const memberCtrl = require('./../controllers/member.controller');

router.put('/:id', memberCtrl.update);
router.get('/:id/routines', memberCtrl.getRoutines);

module.exports = router;