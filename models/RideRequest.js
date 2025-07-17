import mongoose from 'mongoose';

const rideRequestSchema = new mongoose.Schema({
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  fare: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('RideRequest', rideRequestSchema); 