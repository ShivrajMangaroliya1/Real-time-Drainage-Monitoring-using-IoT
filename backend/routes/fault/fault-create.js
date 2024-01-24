const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const reqValidation = require("../../middleware/req-validation");
const Fault = require("../../model/Fault");

router.post(
  "/api/v1/fault",
  [body("data").notEmpty(), body("situation").trim().notEmpty()],
  reqValidation,
  async (req, res, next) => {
    const { data, situation } = req.body;
    const fault = Fault.build({
      data,
      situation,
    });
    await fault.save();
    res.send(fault);
  }
);

module.exports = router;
