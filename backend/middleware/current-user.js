const Jwt = require("jsonwebtoken");
const { JWT_SIGN_KEY } = require("../config");

const currentUser = (req, res, next) => {
  if (!req.session || !req.session.jwt) {
    console.log("bypass");
    return next();
  }
  try {
    const payload = Jwt.verify(req.session.jwt, JWT_SIGN_KEY);
    req.currentUser = payload;
    console.log(req.currentUser);
  } catch (err) {
    console.log(err);
  }
  next();
};

module.exports = currentUser;
