import express from 'express';
import { getAllMerchandise, buyMerchandise, createMerchandise, verifyMerchandise, deleteMerchandise } from '../controller/merchandiseController.js';

const router = express.Router();

router.get('/', getAllMerchandise);
router.post('/', createMerchandise);
router.post('/:id/buy', buyMerchandise);

// Admin routes
router.post('/:id/verify', verifyMerchandise); // Admin: verify listing
router.delete('/:id', deleteMerchandise); // Admin: delete listing

export default router;
