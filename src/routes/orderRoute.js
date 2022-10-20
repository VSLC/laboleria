import express from 'express'
import { postClient } from '../controllers/clientsController.js';
import { postOrder } from '../controllers/orderController.js'

const router = express.Router();

router.post('/order', postOrder);

export default router;