import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  productQuantity: {
    type: Number,
    required: true,
    min: [1, "Quantity can not be less than 1" ]
  },
  total: {
    type: Number,
    required: [true, "Order must have a total amount"]
  },
  customerName: {
    type: String,
  },
  customerEmail: {
    type: String,
  },
  customerAddress: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;