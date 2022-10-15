const { getManagerJobService, getManagerJobByIdService } = require("../service/manager.service");

exports.getManagerJobs = async (req, res, next) => {
    try {
  
  const result= await getManagerJobService(req.user.email)
      res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: " cant get job ",
        error: error.message,
      });
    }
  };

  exports.getManagerJobById = async (req, res, next) => {
    try {
  const {id}=req.params
  const result= await getManagerJobByIdService(id,req.user.email)
      res.status(200).json({
        status: "success",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: " cant get job ",
        error: error.message,
      });
    }
  };