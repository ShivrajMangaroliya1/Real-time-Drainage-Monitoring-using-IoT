const mongoose = require("mongoose");

const rsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "please add name of rs"],
    },
    version: {
      type: String,
      trim: true,
      required: [true, "please add version of rs"],
    },
    deployedDate: {
      type: Date,
      default: Date.now,
    },
    values: {
      type: [Number],
      required: [true, "add values for values field"],
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      Coordinates: {
        type: [Number],
        index: "2dsphere",
      },
    },
    sensorId: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Sensor",
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

rsSchema.pre("save", function (next) {
  console.log("save run");
  this.location = {
    type: "Point",
    Coordinates: [this.get("values[0]"), this.get("values[1]")],
    // Coordinates: [123, 456],
  };
  next();
});

rsSchema.statics.build = (attr) => {
  return new Rs(attr);
};

const Rs = mongoose.model("Rs", rsSchema);

module.exports = Rs;
