import express from 'express'
import { postOrder, getOrder } from '../controllers/orderController.js'

const router = express.Router();

router.post('/order', postOrder);
router.get('/orders', getOrder);

export default router;