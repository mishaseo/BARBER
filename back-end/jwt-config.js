const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const User = require("./schemas/user");
require("dotenv").config();

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt"); // look for the Authorization request header
jwtOptions.secretOrKey = process.env.SESSION_SECRET;

const jwtStrategy = new JwtStrategy(jwtOptions, async function (
  jwt_payload,
  done
) {
  let user;
  try {
    console.log(jwt_payload.id);
    const user = await User.findById(jwt_payload.id);
    done(null, user);
  } catch (err) {
    done(err, false);
  }
});

module.exports = {
  jwtOptions,
  jwtStrategy,
};
