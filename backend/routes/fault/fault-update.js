const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const reqValidation = require("../../middleware/req-validation");
const Fault = require("../../model/Fault");
// const Rs = require("../../model/Rs");
const BadRequestError = require("../../errors/BadRequestError");

router.put(
  "/api/v1/fault/:id",
  [body("solved").notEmpty()],
  reqValidation,
  async (req, res, next) => {
    // const { id } = req.params.id;
    // const { name, kind, values, rsId } = req.body;
    // const newSensor = Sensor.build({ name, kind, values });
    // await newSensor.save();
    const foundedFault = await Fault.findOne({ _id: req.params.id });
    if (!foundedFault) {
      return next(new BadRequestError("Fault is not exist"));
    }

    //need to implement one more if user is admin or not role base later
    //but later

    const updatedFault = foundedFault.set({
      ...req.body,
    });

    await updatedFault.save();

    //rs stuff
    // const foundUpdatedRs = await Rs.findByIdAndUpdate(
    //   rsId,
    //   {
    //     $pull: { sensorId: newSensor.id },
    //   },
    //   { new: true }
    // );

    res.send(updatedFault);
  }
);

module.exports = router;
