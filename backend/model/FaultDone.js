const mongoose = require("mongoose");

const faultDoneSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: [true, "please add an _id for faultDone"],
  },
  name: {
    type: String,
    trim: true,
    // required: [true, "please add name for fault"],
    // enum: ["over", "minus"],
    default: "Blockage detected",
  },
  data: {
    type: [{}],
    required: [true, "please add an data for faultDone"],
  },
  faultDoneTime: {
    type: Date,
    default: Date.now,
  },
  date: {
    type: Date,
  },
  situation: {
    type: String,
    enum: ["over", "minus"],
    required: [true, "please add an situation for faultDone"],
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
    enum: ["true"],
  },
  action: {
    type: String,
    required: [true, "please add an situation for fault"],
  },
});

faultDoneSchema.statics.build = (attr) => {
  return new FaultDone(attr);
};

const FaultDone = mongoose.model("FaultDone", faultDoneSchema);

module.exports = FaultDone;
