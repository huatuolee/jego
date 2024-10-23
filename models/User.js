const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['관리자', '직원'], default: '직원' }
});

module.exports = mongoose.model('User', UserSchema);
