const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const Professor = new Schema({
  role:{type:String,default:"professor"},
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
  courses:[{type:Schema.Types.ObjectId, ref:"course"}],
  isAdmin: {type: Boolean, default: false}
});

module.exports = User = model("professor", Professor);