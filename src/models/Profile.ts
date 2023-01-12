import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  dateOfBirth: String,
  sports: [String],
  location: String,
  team: String,
  description: String,
});

module.exports =
  mongoose.models.Profile ||
  mongoose.model("Profile", ProfileSchema, "profile");
