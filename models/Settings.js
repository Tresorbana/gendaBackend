import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  settings: { type: Object, default: {} }, // e.g., notification preferences, language, etc.
}, { timestamps: true });

export default mongoose.model('Settings', settingsSchema); 