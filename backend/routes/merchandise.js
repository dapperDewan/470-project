import express from 'express';
import { getAllMerchandise, buyMerchandise, createMerchandise } from '../controller/merchandiseController.js';

const router = express.Router();

router.get('/', getAllMerchandise);
router.post('/', createMerchandise);
router.post('/:id/buy', buyMerchandise);

export default router;
