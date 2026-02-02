import Order from '../models/order.model.js';
import APIFeatures from '../utils/apiFeatures.js';
import AppError from '../utils/appError.js';

export const createOrder = async (req, res, next) => {
  try {
    const newOrder = await Order.create({
      userId: req.user.id,
      productId: req.body.productId,
      productQuantity: req.body.productQuantity,
      total: req.body.total,
      customerName: req.user.customerName,
      customerEmail: req.user.customerEmail,
      customerAddress: req.user.customerAddress
    });

    res.status(201).json({
      status: 'success',
      data: {
        order: newOrder
      }
    });
    
  } catch (error) {
    return next(new AppError(error.message, 401));
  }
}

export const getAllOrders = async (req, res, next) => {
  try {
    const features = new APIFeatures(Order.find(), req.query).filter().sort().limitFields().paginate();
    const orders = await features.query;

    res.status(200).json({
      status: 'success',
      results: orders.length,
      data: { orders }
    })
    
  } catch (error) {
    return next(new AppError(error.message, 401));
  }
}

export const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if(!order){
      return next(new AppError('No order found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { order }
    })
    
  } catch (error) {
    return next(new AppError(error.message, 401));
  }
}

export const updateOrderById = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });

    if(!order){
      return next(new AppError('No order found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { order }
    })
    
  } catch (error) {
    return next(new AppError(error.message, 401));
  }
}

export const deleteOrderById = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if(!order){
      return next(new AppError('No order found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    })
    
  } catch (error) {
    return next(new AppError(error.message, 401));
  }
}