import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  fare: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['completed', 'cancelled'], default: 'completed' },
}, { timestamps: true });

export default mongoose.model('Trip', tripSchema); 