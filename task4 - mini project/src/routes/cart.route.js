import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { createCart, deleteCartById, getAllCarts, getCartById, updateCartById } from '../controllers/cart.controller.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getAllCarts)
  .post(protect, createCart);

router
  .route('/:id')
  .get(protect, getCartById)
  .patch(protect, updateCartById)
  .delete(protect, deleteCartById);


export default router;