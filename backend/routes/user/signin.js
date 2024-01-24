const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const Jwt = require("jsonwebtoken");
const reqValidation = require("../../middleware/req-validation");
const User = require("../../model/User");
const BadRequestError = require("../../errors/BadRequestError");
const { JWT_SIGN_KEY } = require("../../config");
const Password = require("../../util/Password");

router.post(
  "/api/v1/auth/signin",
  [body("username").trim().notEmpty(), body("password").trim().notEmpty()],
  reqValidation,
  async (req, res, next) => {
    const { username, password } = req.body;
    const existUser = await User.findOne({ username });
    if (!existUser) {
      return next(new BadRequestError("enter valid credential"));
    }

    const varifiedPassword = await Password.toCompare(
      existUser.password,
      password
    );
    if (!varifiedPassword) {
      return next(new BadRequestError("enter valid credential"));
    }

    //JWT Stuffs
    const userJwt = Jwt.sign(
      {
        id: existUser.id,
        username: existUser.username,
      },
      JWT_SIGN_KEY
    );

    //making jwt as session data
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(existUser);
  }
);

module.exports = router;
