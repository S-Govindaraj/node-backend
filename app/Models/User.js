// models/user.js
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default:null,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    default:null
  },
  role: {
    type: mongoose.Types.ObjectId,
    ref: "role",
    default:null
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);

module.exports.compaireMyPassword = (password, hash) =>
  bcrypt.compareSync(password, hash);
