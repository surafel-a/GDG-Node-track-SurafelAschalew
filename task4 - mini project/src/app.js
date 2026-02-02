import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import cartRouter from './routes/cart.route.js';
import orderRouter from './routes/order.route.js';
import productRouter from './routes/product.route.js';
import userRouter from './routes/user.route.js';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser()); 

app.use('/api/v1/carts', cartRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

export default app;