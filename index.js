const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
// middleware
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

// database connection
// mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
//   console.log("Database connection is successful");
// });
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uj11r.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "job-portal",
  })
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err));

// route
const jobRoute = require("./routes/job.route");
const userRoute = require("./routes/user.route");
const managerRoute = require("./routes/manager.route");
const { modelName } = require("./models/Job");

// candidate route

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

// posting to database
app.use("/jobs", jobRoute);

// candidate route
app.use("/manager", managerRoute);
// user
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

// module.exports = app;
