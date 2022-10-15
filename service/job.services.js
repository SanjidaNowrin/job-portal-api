const Job = require("../models/Job");
const User = require("../models/User");
const Apply = require("../models/Apply");

exports.createJobService = async (data, email) => {
  const user = await User.findOne({ email });
  data.hiringManager = user._id;
  // console.log('verify user',user);
  const job = await Job.create(data);

  return job;
};

exports.updateJobService = async (id, data) => {
  const job = await Job.updateOne({ _id: id }, data, { runValidators: true });

  return job;
};

exports.getJobService = async (filters,query) => {
  const job = await Job.find(filters,"-application").sort(query.sort);

  return job;
};

exports.getJobByIdService = async (id) => {
  const job = await Job.findOne({ _id: id }).populate("hiringManager");

  return job;
};

exports.applyJobService = async (data, id, email) => {
  const user = await User.findOne({ email: email });

  data.name = user.firstName + user.lastName;
  const theJob = await Job.findOne({ _id: id });
  const timeDiff = new Date(theJob.deadLine).getTime() - new Date().getTime();

  const alreadyApplied = theJob.application.includes(user._id);

  if (timeDiff > 0 && !alreadyApplied) {
    const job = await Apply.create(data);

    const result = await Job.updateOne(
      { _id: id },
      { $push: { application: job._id } }
    );
    return {status:"success",message:"Successfully applied the job"};
  } else if (timeDiff < 0 && !alreadyApplied) {
    return {status:"fail",message:"The deadline is over"};
  } else if ((timeDiff < 0 || timeDiff > 0 )&&alreadyApplied) {
    return {status:"fail",message:"Already applied the job"};
  }
};
