// routes/users.js

const router = require("express").Router();
const { Seeker, Recruiter, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const { connectToDatabase } = require("../database");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      console.error("Validation Error:", error);
      return res.status(400).send({ message: error.details[0].message });
    }

    const { email, password, role } = req.body;

    // Determine the user model based on the role
    const userModel = role === "seeker" ? Seeker : Recruiter;

    // Connect to the databases
    const { recruitersCollection, seekersCollection } =
      await connectToDatabase();

    // Check if the user with the given email already exists in the respective collection
    const userExists = await (role === "seeker"
      ? seekersCollection
      : recruitersCollection
    ).findOne({ email });
    if (userExists) {
      return res
        .status(409)
        .send({ message: "User with given email already exists" });
    }
    // sahithcdjbsijn ----> hashed password

    // If the user does not exist, proceed with creating the user
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(password, salt);

    // Create a new user object before saving
    const userToSave = new userModel({
      ...req.body,
      jobsApplied: [],
      password: hashPassword,
    });

    // Save the user to the respective collection using Mongoose save method
    await (role === "seeker"
      ? seekersCollection
      : recruitersCollection
    ).insertOne(userToSave);

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
