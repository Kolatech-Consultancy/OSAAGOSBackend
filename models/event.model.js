import mongoose from 'mongoose';
const eventSchema = mongoose.Schema(
  {
    title: { type: String, require: true, unique: true },
    description: { type: String, require: true },
    date: { type: String, require: true },
    location: { type: String, require: true },
    organizer: { type: String, require: true },
    // attendees: { type: String, require: true },
    date: { type: String, require: true },
  },
  {
    timestamps: true,
  },
);
const events = mongoose.model('Events', eventSchema);
export default events;
