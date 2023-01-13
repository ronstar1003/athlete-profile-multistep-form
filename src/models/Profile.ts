import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: Number,
  dateOfBirth: String,
  sports: [String],
  location: String,
  team: String,
  description: String,
});

export default (mongoose.models.Profile as mongoose.Model<
  mongoose.InferSchemaType<typeof ProfileSchema>,
  mongoose.ObtainSchemaGeneric<typeof ProfileSchema, "TQueryHelpers">,
  mongoose.ObtainSchemaGeneric<typeof ProfileSchema, "TInstanceMethods">,
  mongoose.ObtainSchemaGeneric<typeof ProfileSchema, "TVirtuals">,
  typeof ProfileSchema
> &
  mongoose.ObtainSchemaGeneric<typeof ProfileSchema, "TStaticMethods">) ||
  mongoose.model("Profile", ProfileSchema, "profile");
