import express from 'express';
import { getUserSettings, updateUserSettings } from '../controllers/settings.controller.js';

const router = express.Router();

router.get('/user/:userId', getUserSettings);
router.put('/user/:userId', updateUserSettings);

export default router; 