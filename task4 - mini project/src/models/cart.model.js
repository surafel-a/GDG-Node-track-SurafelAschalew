import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
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
  }
}, { timestamps: true });

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;