const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3, 
    maxlength: 100, 
  },
  description: {
    type: String,
    required: true,
    minlength: 10, 
    maxlength: 500, 
  },
  tags: {
    type: [String],  
    default: [],     
  },
  images: {
    type: [String],  
    default: [],     
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",     
    required: true,
  },
}, { timestamps: true });  

module.exports = mongoose.model("Car", carSchema);
