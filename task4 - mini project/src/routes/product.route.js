import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { createProduct, deleteProductById, getAllProducts, getProductById, updateProductById } from '../controllers/product.controller.js';

const router = express.Router();

router
  .route('/')
  .get(protect, getAllProducts)
  .post(protect, createProduct);

router
  .route('/:id')
  .get(protect, getProductById)
  .patch(protect, updateProductById)
  .delete(protect, deleteProductById);

export default router;