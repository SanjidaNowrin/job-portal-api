const express = require("express");
const router = express.Router();
const managerController = require("../controller/manager.controller");
const authorization = require("../middleware/authorization");
const verifyToken = require("../middleware/verifyToken");


router
  .route("/jobs")
  .get(verifyToken,authorization("hiring-manager"),managerController.getManagerJobs);

  router
  .route("/jobs/:id").get(verifyToken,authorization("hiring-manager"),managerController.getManagerJobById)



module.exports = router;
