import express from 'express'
import { postOrder, getOrder, getOrderById } from '../controllers/orderController.js'

const router = express.Router();

router.post('/order', postOrder);
router.get('/orders', getOrder);
router.get('/orders/:id', getOrderById)

export default router;