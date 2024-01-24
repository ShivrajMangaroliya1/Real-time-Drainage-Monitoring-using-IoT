const express = require("express");
const router = express.Router();
// const { body } = require("express-validator");
// const reqValidation = require("../../middleware/req-validation");
const Sensor = require("../../model/Sensor");
// const Rs = require("../../model/Rs");
const BadRequestError = require("../../errors/BadRequestError");

router.get(
  "/api/v1/sensor/:id",
  //   [body("rsId").notEmpty()],
  //   reqValidation,
  async (req, res, next) => {
    const foundedSensor = await Sensor.findOne({ _id: req.params.id });
    if (!foundedSensor) {
      return next(new BadRequestError("sensor is not exist"));
    }

    //need to implement one more if user is admin or not
    //but later

    //rs stuff

    res.send(foundedSensor);
  }
);

module.exports = router;
