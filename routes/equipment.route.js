const express = require("express");
const router = express.Router();
const equipmentCtrl = require('./../controllers/equipment.controller');

router.post('/', equipmentCtrl.create);
router.get('/', equipmentCtrl.getAll);
router.get('/:id', equipmentCtrl.get);
router.put('/:id', equipmentCtrl.update);
router.delete('/:id', equipmentCtrl.delete);

module.exports = router;