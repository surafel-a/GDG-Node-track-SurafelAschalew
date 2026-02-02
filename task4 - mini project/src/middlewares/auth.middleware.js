import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import AppError from "../utils/appError.js";

export const protect = async (req, res, next) => {
  let token;

  if(req.cookies.jwt) token = req.cookies.jwt;

  if(!token){
    // return next(new AppError('You are not logged in! Please log in to get access.', 401));
    res.status(401).json({
      status: 'fail',
      message: 'You are not logged in! Please log in to get access.'
    })
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);

  if(!currentUser){
    return next(new AppError('The user belonging to this token does no longer exist.', 401));
  }

  req.user = currentUser;
  next();
}