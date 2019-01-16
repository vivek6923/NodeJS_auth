const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: String,
    name:String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', UserSchema);
