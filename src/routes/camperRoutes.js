// File: src/routes/camperRoutes.js
import express from 'express';
import { getCampers, getCamperById } from '../controllers/camperController.js';

const router = express.Router();

router.get('/', getCampers);
router.get('/:id', getCamperById);

export default router;
