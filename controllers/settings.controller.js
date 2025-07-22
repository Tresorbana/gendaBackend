import Settings from '../models/Settings.js';

export const getUserSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne({ userId: req.params.userId });
    if (!settings) {
      settings = await Settings.create({ userId: req.params.userId, settings: {} });
    }
    res.json({ success: true, settings });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateUserSettings = async (req, res) => {
  try {
    const { settings } = req.body;
    const updated = await Settings.findOneAndUpdate(
      { userId: req.params.userId },
      { settings },
      { new: true, upsert: true }
    );
    res.json({ success: true, settings: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}; 