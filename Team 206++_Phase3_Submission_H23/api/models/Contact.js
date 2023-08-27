const mongoose = require("mongoose");

const ConatctSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message:{
      type:String,
      required: false,
    }
  },
  
  { timestamps: true }
);

module.exports = mongoose.model("Contact", ConatctSchema);
