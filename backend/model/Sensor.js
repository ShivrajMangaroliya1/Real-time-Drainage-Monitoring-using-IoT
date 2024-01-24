const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "please add name of sensor"],
    },
    kind: {
      type: String,
      trim: true,
      required: [true, "please add kind of sensor"],
    },
    deployedDate: {
      type: Date,
      default: Date.now,
    },
    values: {
      type: [Number],
      required: [true, "please add values for values field"],
    },
    location: {
      type: {
        type: "String",
        enum: ["Point"],
      },
      Coordinates: {
        type: [Number],
        index: "2dsphere",
      },
    },
    // data:{
    // later for hour
    // }
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

sensorSchema.pre("save", function (next) {
  console.log("save run");
  this.location = {
    type: "Point",
    Coordinates: [this.get("values[0]"), this.get("values[1]")],
    // Coordinates: [123, 456],
  };
  next();
});

sensorSchema.statics.build = (attr) => {
  return new Sensor(attr);
};

const Sensor = mongoose.model("Sensor", sensorSchema);

module.exports = Sensor;
