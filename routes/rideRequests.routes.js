import express from 'express';
import { createRideRequest, getRideRequests, getRideRequestById, updateRideRequest, deleteRideRequest } from '../controllers/rideRequest.controller.js';

const router = express.Router();

router.post('/', createRideRequest);
router.get('/', getRideRequests);
router.get('/:id', getRideRequestById);
router.put('/:id', updateRideRequest);
router.delete('/:id', deleteRideRequest);

export default router; 