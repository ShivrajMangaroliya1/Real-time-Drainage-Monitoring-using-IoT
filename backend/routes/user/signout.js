const express = require("express");
const router = express.Router();

router.post("/api/v1/auth/signout", (req, res, next) => {
  req.session = null;
  res.send({});
});

module.exports = router;
