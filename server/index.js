const express = require("express");
const app = express();
// const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const multer = require("multer");
const { ObjectId } = require("mongodb");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const { connectToDatabase } = require("./database");
const jwt = require("jsonwebtoken");
const postjob = require("./routes/jobs");
const resumeRouter = require("./routes/resume");
const jobApplyRouter = require("./routes/jobsApply");
// for multer storage.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//middleware
app.use(express.json());
app.use(cors()); // ss -->domain  and  sf-->domain2

// username: sunkarisahith03
// password: mEX0vuRNSE062nEQ

async function run() {
  try {
    const {
      recruitersCollection,
      seekersCollection,
      jobsCollections,
      resumeCollection,
    } = await connectToDatabase();

    // Routes for signup and login
    app.use("/api/users", (req, res, next) => {
      // Pass the recruiters and seekers collections to the user routes
      userRoutes(req, res, next, recruitersCollection, seekersCollection);
    });
    app.use("/api/auth", authRoutes);
    app.use("/", resumeRouter);
    app.use("/", postjob);
    app.use("/", jobApplyRouter);

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    //
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
