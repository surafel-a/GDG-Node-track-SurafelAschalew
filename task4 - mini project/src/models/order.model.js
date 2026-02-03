import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerName: { type: String },
  customerAddress: { type: String },
  cartId: {
    type: String,
    required: [true, "Order must have a cart ID"]
  },
  productId: {
    type: String,
  },
  productQuantity: {
    type: Number,
    min: [1, "Quantity can not be less than 1" ]
  },
  total: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;