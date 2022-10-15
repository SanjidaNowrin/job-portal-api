const {
  createJobService,
  updateJobService,
  getJobService,
  getJobByIdService,
  applyJobService,
} = require("../service/job.services");

exports.createJob = async (req, res, next) => {
  try {
    // save or create

    const result = await createJobService(req.body, req?.user?.email);

    res.status(200).json({
      status: "success",
      message: "Data inserted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: " Data is not inserted ",
      error: error.message,
    });
  }
};

exports.updateJob = async (req, res, next) => {
  try {
    // save or create
    const { id } = req.params;
    const result = await updateJobService(id, req.body);

    res.status(200).json({
      status: "success",
      message: "Data updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: " Data is not updated ",
      error: error.message,
    });
  }
};

exports.getJob = async (req, res, next) => {
  try {
    // console.log('query',req.query);
    let filters = { ...req.query };
    const excludeFields = ["sort", "page", "limit"];
    excludeFields.forEach((field) => delete filters[field]);

    const queries = {};
    if (req.query.sort) {
      // price quantity ---> 'price quantity'
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sort = sortBy;
    }
    const result = await getJobService(filters, queries);

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

exports.getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getJobByIdService(id);
    // console.log('id job',result);
    res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: " cant get the job ",
      error: error.message,
    });
  }
};

exports.applyJob = async (req, res, next) => {
  try {
    const { id } = req.params;
    req.body.applied = id;

    const result = await applyJobService(req.body, id, req.user.email);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: " cant get the job ",
      error: error.message,
    });
  }
};
