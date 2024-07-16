const mongoose = require("mongoose");
const slotSchema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    default: null,
  },
});

const dailyScheduleSchema = new mongoose.Schema({
  date: { required: true, type: Date, unique: true },
  slotSchedule: [slotSchema],
});
const slots = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctorUser",
    required: true,
  },

  schedule: [dailyScheduleSchema],
});

module.exports = mongoose.model("Slots", slots);
