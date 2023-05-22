const mongoose = require("mongoose");
const launchesSchema = mongoose.Schema({
  launchDate: {
    type: Date,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  flightNumber: {
    type: Number,
    required: true,
    default: 100,
  },
  customer: [String],
  upcoming: {
    type: Boolean,
    required: true,
  },
  success: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Launch", launchesSchema);
