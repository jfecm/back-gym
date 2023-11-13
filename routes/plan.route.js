const express = require("express");
const router = express.Router();
const planCtrl = require('./../controllers/plan.controller');

router.post('/', planCtrl.create);
router.get('/', planCtrl.getAll);
router.get('/:id', planCtrl.get);
router.delete('/:id', planCtrl.delete);

module.exports = router;
