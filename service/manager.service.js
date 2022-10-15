const Job=require("../models/Job");
const User=require("../models/User")

exports.getManagerJobService = async (email) => {
 const user=   await User.findOne({ email :email})
    const jobs = await Job.find({ hiringManager:user._id});
    return jobs;
  };

  exports.getManagerJobByIdService = async (id,email) => {
    const user=   await User.findOne({ email :email})
       const jobs = await Job.findOne({ _id:id,hiringManager:user._id}).populate('application');
       return jobs;
     };