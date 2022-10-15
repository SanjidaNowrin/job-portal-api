const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const applySchema = mongoose.Schema(
  {
   name: {
      type: String,
      required: [true, "Please provide your name"],
      maxLength: 100,
      lowercase: true,
    },
   
     resumeLink:{
        type: String,
     },
     
      applied:[{
      
        type: ObjectId,
        ref: "Job",
      
    }]
  },

  {
    timestamps: true,
  }
);

const Apply = mongoose.model("Apply", applySchema);

module.exports = Apply;
