const mongoose = require("mongoose");

const SpeakerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
      required: false,
    },
    role: {
      type: String,
      required: true,
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

module.exports = mongoose.model("Speaker", SpeakerSchema);
