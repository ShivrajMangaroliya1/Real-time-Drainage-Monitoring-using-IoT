const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const reqValidation = require("../../middleware/req-validation");
const Sensor = require("../../model/Sensor");
const Rs = require("../../model/Rs");
const BadRequestError = require("../../errors/BadRequestError");

router.post(
  "/api/v1/sensor",
  [
    body("name").trim().notEmpty(),
    body("kind").trim().notEmpty(),
    body("values").notEmpty(),
    body("rsId").notEmpty(),
  ],
  reqValidation,
  async (req, res, next) => {
    // rs stuff
    const { rsId } = req.body;
    const found = await Rs.findById(rsId);
    console.log(found.sensorId.length);

    if (!found) {
      return next(
        new BadRequestError("Rs is not exist for deployment of sensor")
      );
    }
    if (found.sensorId.length > 12) {
      return next(new BadRequestError("Your Rs exceed maximum limit"));
    }

    const { name, kind, values } = req.body;
    const newSensor = Sensor.build({ name, kind, values });
    await newSensor.save();

    const foundUpdatedRs = await Rs.findByIdAndUpdate(
      rsId,
      {
        $push: { sensorId: newSensor.id },
      },
      { new: true }
    );

    res.send(newSensor);
  }
);

module.exports = router;
