'use strict';
const router = require('express').Router();
const bambooDashboardCtrl = require('./bambooDashboardController');
router.get('/getProjects',bambooDashboardCtrl.getProjects);
router.post('/getPlanDetails',bambooDashboardCtrl.getPlanDetails);
router.post('/getPlans',bambooDashboardCtrl.getPlans);
module.exports = router;
