const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    noOfMembers: {
      type: Number,
      required: true,
    },
    nameOfLeader: {
        type: String,
        required: true,
      },
      nameOfMembers:{
        type:Array,
        required:false
      },
    photo: {
      data: Buffer,
      contentType: String,
      required: false,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    twitter: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);
