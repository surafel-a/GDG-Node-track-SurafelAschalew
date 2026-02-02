import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product must have a name"]
  },
  description: {
    type: String,
    required: [true, "Product must have a description"]
  },
  price: {
    type: Number,
    required: [true, "Product must have a price"]
  },
  stock: {
    type: Number,
    required: [true, "Product must have stock information"]
  },
  category: {
    type: String,
    required: [true, "Product must have a category"]
  },
  imageUrl: {
    type: String,
    required: [true, "Product must have an image"]
  }
});

const Product = mongoose.model("Product", productSchema);

export default Product;
