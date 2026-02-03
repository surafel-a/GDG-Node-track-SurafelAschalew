import Cart from '../models/cart.model.js';
import APIFeatures from '../utils/apiFeatures.js';
import AppError from '../utils/appError.js';

export const createCart = async (req, res, next) => {
  try {
    const newCart = await Cart.create({
      userId: req.user.id,
      productId: req.body.productId,
      productQuantity: req.body.productQuantity
    });

    res.status(201).json({
      status: 'success',
      data: { cart: newCart }
    })
    
  } catch (error) {
    return next(new AppError(error.message, 401));
  }
}

export const getAllCarts = async (req, res, next) => {
  try {
    const features = new APIFeatures(Cart.find(), req.query).filter().sort().limitFields().paginate();
    const carts = await features.query.populate('userId', 'name address -_id').populate('productId', 'name price');

    res.status(200).json({
      status: 'success',
      results: carts.length,
      data: { carts }
    })
    
  } catch (error) {
    return next(new AppError(error.message, 401));
  }
}

export const getCartById = async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.params.id).populate('userId', 'name address -_id').populate('productId', 'name price');

    if(!cart){
      return next(new AppError('No cart found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { cart }
    })
    
  } catch (error) {
    return next(new AppError(error.message, 401));
  }
}

export const updateCartById = async (req, res, next) => {
  try {
    const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });

    if(!cart){
      return next(new AppError('No cart found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { cart }
    })
    
  } catch (error) {
    return next(new AppError(error.message, 401));
  }
}

export const deleteCartById = async (req, res, next) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);

    if(!cart){
      return next(new AppError('No cart found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    })
    
  } catch (error) {
    return next(new AppError(error.message, 401));
  }
}