const express = require("express");
const router = express.Router();
const Rs = require("../../model/Rs");
const BadRequestError = require("../../errors/BadRequestError");

router.get("/api/v1/rs/:id", async (req, res, next) => {
  const rs = await Rs.findOne({ _id: req.params.id });
  if (!rs) {
    next(new BadRequestError("rs is not exist"));
  }
  res.send(rs);
});

module.exports = router;
