const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

// Define distinct collections for Seekers and Recruiters
const Seeker = mongoose.model("seeker", userSchema);
const Recruiter = mongoose.model("recruiter", userSchema);


const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("first Name"),
    lastName: Joi.string().required().label("last Name"),
    email: Joi.string().email().required().label("email"),
    password: passwordComplexity().required().label("password"),
    role: Joi.string().valid("seeker", "recruiter").required().label("role"),
  });
  return schema.validate(data);
};

module.exports = { Seeker, Recruiter, validate };