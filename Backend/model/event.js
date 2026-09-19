import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  id: {
    type: Schema.Types.Number,
    required: true,
    unique: true,
  },
  title: {
    type: Schema.Types.String,
    required: true,
  },
  start_time: Schema.Types.Date,
  end_time: Schema.Types.Date,
  location: Schema.Types.String,
  address: Schema.Types.String,
  is_remote: {
    type: Schema.Types.Boolean,
    default: false,
  },
  status: Schema.Types.String,
  icon: Schema.Types.String,
  category: Schema.Types.String,
  image_url: Schema.Types.String,
  participant_count: {
    type: Schema.Types.Number,
    default: 0,
  },
  participant_previews: [
    {
      initials: Schema.Types.String,
    },
  ],
  capacity: Schema.Types.Number,
  filled: Schema.Types.Number,
  description: [Schema.Types.String],
  requirements: [
    {
      icon: Schema.Types.String,
      title: Schema.Types.String,
      desc: Schema.Types.String,
    },
  ],
  organizer: {
    type: Schema.Types.ObjectId,
    ref: "Organization",
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Event = model("Event", eventSchema);
export default Event;