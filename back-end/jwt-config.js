const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const User = require("./schemas/user");
require("dotenv").config();

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt"); // look for the Authorization request header
jwtOptions.secretOrKey = process.env.SESSION_SECRET;

const jwtStrategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  let user;
  User.findById(jwt_payload.id, (error, results) => {
    if (error) throw error;
    if (results.rows.length != 0) {
      // we found the user... keep going
      user = results.rows[0];
    }
    if (user) {
      next(null, user);
    } else {
      // we didn't find the user... fail!
      next(null, false);
    }
  });
});

module.exports = {
  jwtOptions,
  jwtStrategy,
};
