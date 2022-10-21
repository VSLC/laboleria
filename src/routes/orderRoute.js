import express from 'express'
import { postOrder, getOrder, getOrderById } from '../controllers/orderController.js'
import { orderMiddleware } from '../middlewares/OrderMiddleware.js'
const router = express.Router();

router.post('/order', orderMiddleware, postOrder);
router.get('/orders', getOrder);
router.get('/orders/:id', getOrderById)

export default router;