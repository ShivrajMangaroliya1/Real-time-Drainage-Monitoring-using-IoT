const express = require("express");
const router = express.Router();
// const { body } = require("express-validator");
// const reqValidation = require("../../middleware/req-validation");
const Rs = require("../../model/Rs");
const BadRequestError = require("../../errors/BadRequestError");

router.put("/api/v1/rs/:id", async (req, res, next) => {
  // const { name, version, values } = { ...req.body };
  // console.log(sensorId);
  console.log(req.body);
  const foundedRs = await Rs.findOne({ _id: req.params.id });
  if (!foundedRs) {
    return next(new BadRequestError("rs is not exist"));
  }
  const updatedRs = foundedRs.set({
    ...req.body,
  });
  await updatedRs.save();
  // console.log(newRs.id);
  // const foundRs = await Rs.findByIdAndUpdate(
  //   newRs.id,
  //   {
  //     $push: { sensorId: sensorId },
  //   },
  //   { new: true }
  // );
  // console.log(foundRs);

  res.send(updatedRs);
});

module.exports = router;
