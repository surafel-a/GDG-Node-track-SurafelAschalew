import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { login, logout, register } from '../controllers/auth.controller.js';
import { deleteUserById, getAllUsers, getUserById, updateUserById } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.get('/logout', logout);

router
  .route('/')
  .get(protect, getAllUsers);

router
  .route('/:id')
  .get(protect, getUserById)
  .patch(protect, updateUserById)
  .delete(protect, deleteUserById);

export default router;