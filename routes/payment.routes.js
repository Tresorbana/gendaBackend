import express from 'express';
import { addPaymentMethod, getPaymentMethods, getPaymentMethodById, updatePaymentMethod, deletePaymentMethod } from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/', addPaymentMethod);
router.get('/', getPaymentMethods);
router.get('/:id', getPaymentMethodById);
router.put('/:id', updatePaymentMethod);
router.delete('/:id', deletePaymentMethod);

export default router; 