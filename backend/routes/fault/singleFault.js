const express = require("express");
const router = express.Router();
// const { body } = require("express-validator");
// const reqValidation = require("../../middleware/req-validation");
const Fault = require("../../model/Fault");
// const Rs = require("../../model/Rs");
const BadRequestError = require("../../errors/BadRequestError");

router.get(
  "/api/v1/fault/:id",
  //   [body("rsId").notEmpty()],
  //   reqValidation,
  async (req, res, next) => {
    const foundedFault = await Fault.findOne({ _id: req.params.id });
    if (!foundedFault) {
      return next(new BadRequestError("Fault is not exist"));
    }

    //need to implement one more if user is admin or not
    //but later

    //rs stuff

    res.send(foundedFault);
  }
);

module.exports = router;
