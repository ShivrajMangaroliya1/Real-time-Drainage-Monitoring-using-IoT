const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const reqValidation = require("../../middleware/req-validation");
const Rs = require("../../model/Rs");
const RsExistError = require("../../errors/UserExistError");
// const currentUser = require("../../middleware/current-user");
// const requireAuth = require("../../middleware/require-auth");

router.post(
  "/api/v1/rs",
  [
    body("name").trim().notEmpty(),
    body("version").trim().notEmpty(),
    body("values").notEmpty(),
  ],
  reqValidation,
  async (req, res, next) => {
    const { name, version, values } = { ...req.body };
    // console.log(sensorId);
    const foundedRs = await Rs.findOne({ name });
    if (foundedRs) {
      return next(new RsExistError("please give another name"));
    }
    const newRs = Rs.build({ name, version, values });
    await newRs.save();
    // console.log(newRs.id);
    // const foundRs = await Rs.findByIdAndUpdate(
    //   newRs.id,
    //   {
    //     $push: { sensorId: sensorId },
    //   },
    //   { new: true }
    // );
    // console.log(foundRs);

    res.send(newRs);
  }
);

module.exports = router;
