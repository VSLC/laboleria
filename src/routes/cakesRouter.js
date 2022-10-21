import express from 'express'
import { postCakes } from '../controllers/cakeController.js';
import { cakeMiddleware } from '../middlewares/CakesMiddleware.js';

const router = express.Router();

router.post('/cakes', cakeMiddleware, postCakes);

export default router;