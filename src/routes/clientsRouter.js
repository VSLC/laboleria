import express from 'express'
import { findOrderByClientId, postClient } from '../controllers/clientsController.js'
import { clientMiddleware } from '../middlewares/clientsMiddleware.js';

const router = express.Router();

router.post('/clients', clientMiddleware, postClient);
router.get('/clients/:id/orders', findOrderByClientId);

export default router;