const express = require("express");
const router = express.Router();
const paymentCtrl = require('./../controllers/payment.controller');

router.post('/', paymentCtrl.create);
router.get('/', paymentCtrl.getAll);
router.get('/:id', paymentCtrl.get);
router.put('/:id', paymentCtrl.update);
router.delete('/:id', paymentCtrl.delete);

module.exports = router;