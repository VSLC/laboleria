import express from 'express'
import { postClient } from '../controllers/clientsController.js';

const router = express.Router();

router.post('/clients', postClient);

export default router;