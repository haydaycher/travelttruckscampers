import express from 'express';
import { getCampers, getCamperById } from '../controllers/camperController.js';

const router = express.Router();

// Отримання списку кемперів
router.get('/', getCampers);

// Отримання одного кемпера за ID
router.get('/:id', getCamperById);

export default router;
