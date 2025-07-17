import express from 'express';
import Settings from '../models/Settings.js';

const router = express.Router();

// Get user settings
router.get('/user/:userId', async (req, res) => {
  try {
    let settings = await Settings.findOne({ userId: req.params.userId });
    if (!settings) {
      settings = await Settings.create({ userId: req.params.userId, settings: {} });
    }
    res.json({ success: true, settings });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user settings
router.put('/user/:userId', async (req, res) => {
  try {
    const { settings } = req.body;
    const updated = await Settings.findOneAndUpdate(
      { userId: req.params.userId },
      { settings },
      { new: true, upsert: true }
    );
    res.json({ success: true, settings: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router; 