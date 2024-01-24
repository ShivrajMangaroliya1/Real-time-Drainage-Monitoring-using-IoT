const express = require("express");
const router = express.Router();
const Fault = require("../../model/Fault");
const FaultDone = require("../../model/FaultDone");
const BadRequestError = require("../../errors/BadRequestError");

router.post("/api/v1/fault/:id", async (req, res, next) => {
  // const { id } = req.params.id;
  // const newSensor = Sensor.build({ name, kind, values });
  // await newSensor.save();
  const foundedFault = await Fault.findOne({ _id: req.params.id });
  if (!foundedFault) {
    return next(new BadRequestError("fault is not exist"));
  }

  //need to implement one more if user is admin or not
  //but later
  // if (foundedFault.solved == "false") {
  //   return next(new BadRequestError("first solve Fault"));
  // }

  console.log(req.query);
  console.log(foundedFault);

  const faultDoneCreated = FaultDone.build({
    _id: req.params.id,
    name: foundedFault.name,
    data: [...foundedFault.data],
    date: foundedFault.date,
    situation: foundedFault.situation,
    sensor: [...foundedFault.sensor],
    rs: foundedFault.rs,
    solved: "true",
    action: req.body.action,
  });

  console.log(faultDoneCreated);
  await faultDoneCreated.save();
  await foundedFault.delete();

  //rs stuff

  res.send({});
});

module.exports = router;
