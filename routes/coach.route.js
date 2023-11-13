const express = require('express');
const router = express.Router();
const routineCtrl = require("../controllers/routine.controller");

router.use('/exercises', require('./exercise.route'));
router.post('/routine/custom/u/:idu', routineCtrl.createCustom);
router.post('/routine/generic/u/:idu/r/:idr', routineCtrl.createGeneric);
router.post('/routine', routineCtrl.create);
router.get('/routines/:id', routineCtrl.get);
router.get('/routines', routineCtrl.getAll);
router.put('/routines/:id', routineCtrl.update);
router.delete('/routines/:id', routineCtrl.delete);

module.exports = router;