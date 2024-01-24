const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const reqValidation = require("../../middleware/req-validation");
const Sensor = require("../../model/Sensor");
const Rs = require("../../model/Rs");
const BadRequestError = require("../../errors/BadRequestError");

router.delete(
  "/api/v1/sensor/:id",
  [body("rsId").notEmpty()],
  reqValidation,
  async (req, res, next) => {
    // const { id } = req.params.id;
    const { rsId } = req.body;
    console.log(rsId);
    // const newSensor = Sensor.build({ name, kind, values });
    // await newSensor.save();
    const foundedSensor = await Sensor.findOne({ _id: req.params.id });
    if (!foundedSensor) {
      return next(new BadRequestError("sensor is not exist"));
    }

    //need to implement one more if user is admin or not
    //but later
    await foundedSensor.delete();

    //rs stuff
    const foundUpdatedRs = await Rs.findByIdAndUpdate(
      rsId,
      {
        $pull: { sensorId: foundedSensor.id },
      },
      { new: true }
    );

    res.send({});
  }
);

module.exports = router;
