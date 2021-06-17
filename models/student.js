const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const Student = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: String,
});

module.exports = User = model("student", Student);