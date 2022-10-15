const express = require("express");
const router = express.Router();
const jobController = require("../controller/job.controller");
const verifyToken = require("../middleware/verifyToken");

router
  .route("/")
  .post(verifyToken, jobController.createJob)
  .get(jobController.getJob);

  router
  .route("/:id/apply").post(verifyToken,jobController.applyJob)
router
  .route("/:id")
  .patch(verifyToken, jobController.updateJob)
  .get(jobController.getJobById);

 

module.exports = router;
