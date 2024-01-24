const express = require("express");
const router = express.Router();
// const { body } = require("express-validator");
// const reqValidation = require("../../middleware/req-validation");
const Sensor = require("../../model/Sensor");
// const Rs = require("../../model/Rs");
const BadRequestError = require("../../errors/BadRequestError");

router.put("/api/v1/sensor/:id", async (req, res, next) => {
  // const { id } = req.params.id;
  // const { name, kind, values, rsId } = req.body;
  // const newSensor = Sensor.build({ name, kind, values });
  // await newSensor.save();
  const foundedSensor = await Sensor.findOne({ _id: req.params.id });
  if (!foundedSensor) {
    return next(new BadRequestError("sensor is not exist"));
  }

  //need to implement one more if user is admin or not
  //but later

  const updatedSensor = foundedSensor.set({
    ...req.body,
  });

  await updatedSensor.save();

  //rs stuff
  // const foundUpdatedRs = await Rs.findByIdAndUpdate(
  //   rsId,
  //   {
  //     $pull: { sensorId: newSensor.id },
  //   },
  //   { new: true }
  // );

  res.send(updatedSensor);
});

module.exports = router;
