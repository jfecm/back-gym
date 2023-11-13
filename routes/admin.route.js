const express = require('express');
const router = express.Router();

const userCtrl = require("../controllers/user.controller");
const planCtrl = require("../controllers/plan.controller");
const paymentCtrl = require("../controllers/payment.controller");
const equipmentCtrl = require("../controllers/equipment.controller");

router.post('/create-admin', userCtrl.createAdmin);
router.post('/create-coach', userCtrl.createCoach);
router.post('/create-member/plan/:id', userCtrl.createMember);
router.use('/payments', require('./payment.route'));
router.use('/equipments', require('./equipment.route'));
router.use('/plans', require('./plan.route'));
router.get('/users', userCtrl.getAll);
router.get('/users/:id', userCtrl.get);
router.get('/plans', planCtrl.getAll);
router.get('/sales-report', paymentCtrl.getAll);
router.get('/users/:id/generate-access-credentials', userCtrl.sendCredentials);
router.delete('/users/:id', userCtrl.delete);
router.put('/memberships', userCtrl.associateUserWithPlan);
router.put('/users/:id', userCtrl.update);
router.put('/users/:id/change-password', userCtrl.updatePassword);

module.exports = router;