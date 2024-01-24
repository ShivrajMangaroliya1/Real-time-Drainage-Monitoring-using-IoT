const express = require("express");
const router = express.Router();
// const { body } = require("express-validator");
// const reqValidation = require("../../middleware/req-validation");
const Rs = require("../../model/Rs");
const BadRequestError = require("../../errors/BadRequestError");
const axios = require("axios");

router.delete("/api/v1/rs/:id", async (req, res, next) => {
  // const { name, version, values } = { ...req.body };
  // console.log(sensorId);
  const foundedRs = await Rs.findOne({ _id: req.params.id });
  if (!foundedRs) {
    return next(new BadRequestError("rs is not exist"));
  }
  console.log(foundedRs.sensorId.length);

  //   await foundedRs.delete();
  // console.log(newRs.id);
  // const foundRs = await Rs.findByIdAndUpdate(
  //   req.params.id,
  //   {
  //     $pull: { sensorId: foundedRs.sensorId },
  //   },
  //   { new: true }
  // );
  // console.log(foundRs);
  foundedRs.sensorId.forEach(async (sensor) => {
    await axios.delete(
      `http://localhost:4000/api/v1/sensor/${sensor.toString()}`,
      {
        data: {
          rsId: req.params.id,
        },
      }
    );
  });

  await foundedRs.delete();

  res.send({});
});

module.exports = router;
