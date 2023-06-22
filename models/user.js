const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    gmail: {
      type: String,
      required: true,
      unique: true,
      minlength: 3
    },
    firstname: {
      type: String,
      required: true,
      minlength: 3
    },
    lastname: {
      type: String,
      required: true,
      minlength: 3
    },
    password: {
      type: String,
      required: true,
      minlength: 3
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('App-Users', userSchema);

module.exports = User;
