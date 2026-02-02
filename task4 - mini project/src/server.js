import dotenv from 'dotenv';
import connectDB from './config/db.js';
dotenv.config();
connectDB();

import app from './app.js';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});