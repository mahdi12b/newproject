const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CoursSchema = new Schema({
  video:{
    type:String,
  },
  exercice:{
    type:String,
  },
  matiere:{
   type:String,
   required:true
  },
  coursFor:{
      type:String,
      required:true,
  },
  name: {
    type: String,
    required: true,
  },
  id_prof:{
    type: Schema.Types.ObjectId, ref: "professor"
  },
 

});

module.exports = Cours = model("cours", CoursSchema);