const mongoose = require("mongoose");

const actorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20
  },
  birthday: {
    type: Date,
    required: true
  },
  country: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 250
  }
});

const Actor = mongoose.model("Actor", actorSchema);

exports.Actor = Actor;
