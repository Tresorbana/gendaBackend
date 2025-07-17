import express from 'express';
import PaymentMethod from '../models/PaymentMethod.js';

const router = express.Router();

// Add a payment method
router.post('/', async (req, res) => {
  try {
    const { userId, type, details, isDefault } = req.body;
    if (isDefault) {
      // Unset previous default
      await PaymentMethod.updateMany({ userId }, { isDefault: false });
    }
    const method = await PaymentMethod.create({ userId, type, details, isDefault });
    res.json({ success: true, method });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all payment methods for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const methods = await PaymentMethod.find({ userId: req.params.userId });
    res.json({ success: true, methods });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a payment method
router.put('/:id', async (req, res) => {
  try {
    const { isDefault } = req.body;
    const method = await PaymentMethod.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (isDefault) {
      // Unset previous default
      await PaymentMethod.updateMany({ userId: method.userId, _id: { $ne: method._id } }, { isDefault: false });
    }
    res.json({ success: true, method });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a payment method
router.delete('/:id', async (req, res) => {
  try {
    await PaymentMethod.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router; 