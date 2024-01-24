const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const Jwt = require("jsonwebtoken");
const reqValidation = require("../../middleware/req-validation");
const User = require("../../model/User");
const UserExistError = require("../../errors/UserExistError");
const { JWT_SIGN_KEY } = require("../../config");

router.post(
  "/api/v1/auth/signup",
  [
    body("username").trim().notEmpty(),
    body("password").trim().isLength({ min: 8 }).notEmpty(),
  ],
  reqValidation,
  async (req, res, next) => {
    const { username } = req.body;
    const existUser = await User.findOne({ username });
    if (existUser) {
      return next(new UserExistError("user already exist"));
    }
    const newUser = User.build(req.body);
    await newUser.save();

    //JWT Stuffs
    const userJwt = Jwt.sign(
      {
        id: newUser.id,
        username: newUser.username,
      },
      JWT_SIGN_KEY
    );

    //making jwt as session data
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(newUser);
  }
);

module.exports = router;
