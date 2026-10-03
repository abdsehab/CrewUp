import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  displayName: Schema.Types.String,
  password: {
    type: Schema.Types.String,
    required: true,
  },
  image: Schema.Types.String,
  role: {
    type: Schema.Types.String,
    enum: ["volunteer", "organization", "admin"],
    default: "volunteer"
  }
});

const User = model("User", userSchema);
export default User;
