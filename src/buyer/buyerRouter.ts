import express from 'express';
import { acceptRequest, rejectRequest } from './buyerController';

const router = express.Router();

// Route to handle accepting a recycling request
router.post('/accept', acceptRequest);

// Route to handle rejecting a recycling request
router.post('/reject', rejectRequest);

export default router;
