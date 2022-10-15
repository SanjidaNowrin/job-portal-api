const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a job title"],
      maxLength: 100,
      lowercase: true,
    },
    description: String,

    skills: [{ type: String, required: [true, "Please provide skills"] }],
    jobType: {
      type: String,

      enum: ["Remote", "On-site", "Hybrid"],
      required: [true, "Please provide one of these {VALUE} job type"],
    },
    jobLocation: {
      type: String,
      required: [true, "Please provide a job location"],
    },
    experience: {
      type: String,
      required: [true, "Please provide a job experience"],
    },
    salary: {
      type: Number,
      required: [true, "Please provide salary"],
    },
    deadLine: {
      type: String,
      required: [true, "Please provide a deadline"],
    },
    hiringManager: {
      type: ObjectId,
      ref: "User",
    },
    application: [
      {
        type: ObjectId,
        ref: "Apply",
      },
    ],
  },

  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
