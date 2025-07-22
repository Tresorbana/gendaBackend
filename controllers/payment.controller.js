import PaymentMethod from '../models/PaymentMethod.js';

export const addPaymentMethod = async (req, res) => {
  try {
    const method = await PaymentMethod.create(req.body);
    res.status(201).json({ success: true, method });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getPaymentMethods = async (req, res) => {
  try {
    const methods = await PaymentMethod.find();
    res.json({ success: true, methods });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getPaymentMethodById = async (req, res) => {
  try {
    const method = await PaymentMethod.findById(req.params.id);
    if (!method) return res.status(404).json({ success: false, message: 'Payment method not found' });
    res.json({ success: true, method });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updatePaymentMethod = async (req, res) => {
  try {
    const method = await PaymentMethod.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!method) return res.status(404).json({ success: false, message: 'Payment method not found' });
    res.json({ success: true, method });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const deletePaymentMethod = async (req, res) => {
  try {
    const method = await PaymentMethod.findByIdAndDelete(req.params.id);
    if (!method) return res.status(404).json({ success: false, message: 'Payment method not found' });
    res.json({ success: true, message: 'Payment method deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}; 