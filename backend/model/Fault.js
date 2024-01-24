const mongoose = require("mongoose");

const faultSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    // required: [true, "please add name for fault"],
    // enum: ["over", "minus"],
    default: "Blockage detected",
  },
  data: {
    type: [{}],
    required: [true, "please add an data for fault"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  situation: {
    type: String,
    enum: ["over", "minus"],
    required: [true, "please add an situation for fault"],
  },
  sensor: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Sensor",
    },
  ],
  rs: {
    type: mongoose.Types.ObjectId,
    ref: "Rs",
  },

  solved: {
    type: String,
    enum: ["true", "false"],
    default: "false",
  },
});

faultSchema.statics.build = (attr) => {
  return new Fault(attr);
};

const Fault = mongoose.model("Fault", faultSchema);

module.exports = Fault;
