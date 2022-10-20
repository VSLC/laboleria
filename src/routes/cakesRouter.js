import express from 'express'
import { postCakes } from '../controllers/cakeController.js';

const router = express.Router();

router.post('/cakes', postCakes);

export default router;