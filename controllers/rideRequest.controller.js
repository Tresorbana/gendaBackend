import RideRequest from '../models/RideRequest.js';

export const createRideRequest = async (req, res) => {
  try {
    const request = await RideRequest.create(req.body);
    res.status(201).json({ success: true, request });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getRideRequests = async (req, res) => {
  try {
    const requests = await RideRequest.find();
    res.json({ success: true, requests });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getRideRequestById = async (req, res) => {
  try {
    const request = await RideRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ success: false, message: 'Ride request not found' });
    res.json({ success: true, request });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateRideRequest = async (req, res) => {
  try {
    const request = await RideRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!request) return res.status(404).json({ success: false, message: 'Ride request not found' });
    res.json({ success: true, request });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const deleteRideRequest = async (req, res) => {
  try {
    const request = await RideRequest.findByIdAndDelete(req.params.id);
    if (!request) return res.status(404).json({ success: false, message: 'Ride request not found' });
    res.json({ success: true, message: 'Ride request deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}; 