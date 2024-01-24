const express = require("express");
const router = express.Router();
// const { body } = require("express-validator");
// const reqValidation = require("../../middleware/req-validation");
const Rs = require("../../model/Rs");
// const BadRequestError = require("../../errors/BadRequestError");

router.get("/api/v1/rs", async (req, res, next) => {
  const allRs = await Rs.find({});
  res.send(allRs);
});

module.exports = router;
