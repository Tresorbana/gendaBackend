import express from 'express';
import Trip from '../models/Trip.js';

const router = express.Router();

// Create a new trip
router.post('/', async (req, res) => {
  try {
    const { driverId, customerId, from, to, fare } = req.body;
    const trip = await Trip.create({ driverId, customerId, from, to, fare });
    res.json({ success: true, trip });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch trips for a driver
router.get('/driver/:driverId', async (req, res) => {
  try {
    const trips = await Trip.find({ driverId: req.params.driverId }).sort({ date: -1 }).limit(20);
    res.json({ success: true, trips });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch trips for a customer
router.get('/customer/:customerId', async (req, res) => {
  try {
    const trips = await Trip.find({ customerId: req.params.customerId }).sort({ date: -1 }).limit(20);
    res.json({ success: true, trips });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router; 