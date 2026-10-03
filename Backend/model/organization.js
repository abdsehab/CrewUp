import { Schema, model } from "mongoose";

const organizationSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  desc: Schema.Types.String,
  bio: Schema.Types.String,
  image: Schema.Types.String,
  email: Schema.Types.String,
  events: {
    type: Schema.Types.Number,
    default: 0,
  },
  volunteers: Schema.Types.String,
  verified: {
    type: Schema.Types.Boolean,
    default: true,
  },
  status: {
    type: Schema.Types.String,
    enum: ["Pending", "Verified", "Suspended"],
    default: "Pending",
  }
}, { timestamps: true });

const Organization = model("Organization", organizationSchema);
export default Organization;