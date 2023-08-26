const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      required: false,
    },
    // eventLink:{
    //   type: String,
    //   required: true,
    // },
    registeredUsers: {
      type: Array,
      required: true,
    },
    userCount: {
      type: Number,
      required: false,
    },
    conductedby: {
      type: String,
      required: false,
    },
    //   user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: false,
    //  },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
