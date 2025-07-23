import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'driver'], required: true },
  picture: { type: String },
  profilePhoto: { type: String },
  balance: { type: Number, default: 0 },
  rating: { type: Number, default: 5 },
  verified: { type: Boolean, default: false },
  otp: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  car: {
    make: { type: String },
    model: { type: String },
    licensePlate: { type: String },
    picture: { type: String },
    pricePerKm: { type: Number },
  },
}, { timestamps: true });

export default mongoose.model('User', userSchema); 