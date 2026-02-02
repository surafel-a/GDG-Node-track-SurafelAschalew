import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { createOrder, deleteOrderById, getAllOrders, getOrderById, updateOrderById } from '../controllers/order.controller.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getAllOrders)
  .post(protect, createOrder);

router
  .route('/:id')
  .get(protect, getOrderById)
  .patch(protect, updateOrderById)
  .delete(protect, deleteOrderById);

export default router;