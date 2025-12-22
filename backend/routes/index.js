const express = require('express');
const router = express.Router();

const authRoutes = require('./authentication.js');

const clientRoutes=require('./client_management.js');

const branchRoutes= require('./branch.js');

const bookingRoutes= require('./bookings.js');
const rolesRoutes= require('./roles');
const seatRoutes= require('./seats.js');
const rolesRouter = require('./roles');
const seatTypeRouter= require('./seat_type');
const plansRouter= require('./plan.js');
const subscriptionsRouter=require('./subscription.js');
const clientSubscriptionsRouter = require('./subscription.js');

router.use('/auth', authRoutes);

router.use('/clients', clientRoutes);

router.use('/branch', branchRoutes);
router.use('/booking',bookingRoutes);
router.use('/roles',rolesRoutes);
router.use('/seats',seatRoutes);
router.use('/seat_type',seatTypeRouter);
router.use('/plans',plansRouter);
router.use('/subscriptions',clientSubscriptionsRouter);

module.exports = router;