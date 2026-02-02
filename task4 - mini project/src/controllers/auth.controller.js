import User from '../models/user.model.js';
import AppError from '../utils/appError.js';
import createSendToken from '../utils/createSendToken.js';

export const register = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      address: req.body.address
    });

    createSendToken(newUser, 201, res);
    
  } catch (error) {
    next(error);
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password){
    res.status(400).json({
      status: 'fail',
      message: 'Please provide email and password'
    });
  }

  const user = await User.findOne({ email }).select('+password');

  if(!user || !(await user.correctPassword(password, user.password))){
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(user, 200, res);
}

export const logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({ status: 'success' });
}