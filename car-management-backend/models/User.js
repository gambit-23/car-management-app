const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true, // Trims spaces from the username
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Ensures email is stored in lowercase
    trim: true,      // Trims spaces
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'], // Email format validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6,  // You can enforce a minimum password length
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model("User", userSchema);
