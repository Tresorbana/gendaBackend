import express from 'express';
import RideRequest from '../models/RideRequest.js';

const router = express.Router();

// Create a new ride request
router.post('/', async (req, res) => {
  try {
    const { customerId, from, to, fare } = req.body;
    const request = await RideRequest.create({ customerId, from, to, fare });
    res.json({ success: true, request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch all pending ride requests
router.get('/pending', async (req, res) => {
  try {
    const requests = await RideRequest.find({ status: 'pending' }).sort({ createdAt: -1 });
    res.json({ success: true, requests });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Accept a ride request
router.post('/:id/accept', async (req, res) => {
  try {
    const { driverId } = req.body;
    const request = await RideRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'accepted', driverId },
      { new: true }
    );
    res.json({ success: true, request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router; 