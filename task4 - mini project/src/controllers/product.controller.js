import Product from '../models/product.model.js';
import APIFeatures from '../utils/apiFeatures.js';
import AppError from '../utils/appError.js';

export const createProduct = async (req, res, next) => {
  try {
    const newProduct = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
      imageUrl: req.body.imageUrl
    });

    res.status(201).json({
      status: 'success',
      data: {
        product: newProduct
      }
    });
    
  } catch (error) {
    return next(new AppError(error.message, 401));
  }
}

export const getAllProducts = async (req, res, next) => {
  try {
    const features = new APIFeatures(Product.find(), req.query).filter().sort().limitFields().paginate();
    const products = await features.query;

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: { products }
    })
    
  } catch (error) {
    return next(new AppError(error.message, 401));
  }
}

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if(!product){
      return next(new AppError('No product found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { product }
    })
    
  } catch (error) {
    return next(new AppError(error.message, 401));
  }
}

export const updateProductById = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true
    });

    if(!product){
      return next(new AppError('No product found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { product }
    })
    
  } catch (error) {
    return next(new AppError(error.message, 401));
  }
}

export const deleteProductById = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if(!product){
      return next(new AppError('No product found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    })
    
  } catch (error) {
    return next(new AppError(error.message, 401));
  }
}