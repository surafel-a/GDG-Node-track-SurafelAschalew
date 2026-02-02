import dotenv from 'dotenv';
import connectDB from './config/db';
dotenv.config();
connectDB();

import app from './app';

const port = process.env.PORT || 3000;