const express = require("express");
const verifyToken = require("../utils/verifyToken");
const { connectToDatabase } = require("../database");
const { ObjectId } = require("mongodb");
const router = express.Router();

router.get("/api/checking", (req, res) => {
  res.send("Job Apply end point eorking!!");
});

// Using job id applying the job
router.post("/apply-job/:id", verifyToken, async (req, res) => {
  const { jobsCollection, seekersCollection } = await connectToDatabase();
  const { _id } = req.user;
  const id = req.params.id;
  const seeker = await seekersCollection.findOneAndUpdate(
    {
      _id: new ObjectId(_id),
    },
    { $push: { jobsApplied: id } },
    { new: true }
  );
  const updatedJob = await jobsCollection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $push: { appliedUsers: _id } },
    { new: true }
  );
  res.send(updatedJob);
});

// Using job id to get applied users
router.get("/applied-users/:id", async (req, res) => {
  try {
    console.log("looking for appliedUsers");
    const { jobsCollection, profileCollection } = await connectToDatabase();
    const id = req.params.id;

    // Convert id to ObjectId
    const objectId = new ObjectId(id);

    // Find the job document by its id
    const job = await jobsCollection.findOne({ _id: objectId });

    const { appliedUsers } = job;
    const seekersPromises = appliedUsers.map(async (id) => {
      console.log(id);
      const user = await profileCollection.findOne({
        seekerId: id,
      });
      return user;
    });

    const seekers = await Promise.all(seekersPromises);

    res.send(seekers);
  } catch (error) {
    console.error("Error retrieving job details:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
