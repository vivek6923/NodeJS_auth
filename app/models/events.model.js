const mongoose = require('mongoose');

const EventSchema = mongoose.Schema(
  {
    eventName: { type: String, unique: true, required: true },
    location: String,
    description: String,
    eventType: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Event', EventSchema);
