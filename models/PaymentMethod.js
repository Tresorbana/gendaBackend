import mongoose from 'mongoose';

const paymentMethodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['card', 'paypal', 'cash'], required: true },
  details: { type: Object, required: true }, // e.g., card number, PayPal email
  isDefault: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('PaymentMethod', paymentMethodSchema); 