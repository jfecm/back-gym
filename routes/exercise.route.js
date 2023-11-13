const express = require('express');
const router = express.Router();
const exerciseCtrl = require("../controllers/exercise.controller");

router.post('/', exerciseCtrl.create);
router.get('/', exerciseCtrl.getAll);
router.get('/:id', exerciseCtrl.get);
router.put('/:id', exerciseCtrl.update);
router.delete('/:id', exerciseCtrl.delete);

module.exports = router;