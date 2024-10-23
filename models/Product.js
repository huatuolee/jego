const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['입고', '출고'] },
  quantity: Number,
  date: { type: Date, default: Date.now }
});

const ProductSchema = new mongoose.Schema({
  name: String,
  material: String,
  thickness: Number,
  quantity: Number,
  transactions: [TransactionSchema]
});

module.exports = mongoose.model('Product', ProductSchema);
