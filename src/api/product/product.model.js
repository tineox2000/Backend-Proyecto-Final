const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true},
    quantity: {type: Number, required: true},
    price: { type: Number, required: true },
    photo: {type: String },
    store: {type: Schema.Types.ObjectId, ref: 'Store'}
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema); 

module.exports = Product;
