const mongoose = require("mongoose");

const audioSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
  },
  sound: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Audio", audioSchema);
