const express = require("express");
const router = express.Router();
const Sensor = require("../../model/Sensor");

router.get("/api/v1/sensor", async (req, res) => {
  const allSensor = await Sensor.find({});
  res.send(allSensor);
});

module.exports = router;
