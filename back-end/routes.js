//using express's router
const { Router } = require("express");
const router = Router();
const User = require("./schemas/user");
//for hashing passwords
const bcrypt = require("bcrypt");

//Authentication
const passport = require("passport");
const { jwtOptions, jwtStrategy } = require("./jwt-config.js"); // import setup options for using JWT in passport
passport.use(jwtStrategy);
const jwt = require("jsonwebtoken");
//--------------------------Functions--------------------------------
function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

//----------------------LOGIN---------------------------------------
router.get("/login", async (req, res) => {
  const { email, password } = req.body;

  if (emailIsValid(email)) {
    try {
      //find user by email
      const user = await User.findOne({
        email: email,
      });
      //compare passwords
      const match = await bcrypt.compare(password, user.password);
      //found a match
      if (match) {
        //const token = jwt.sign(match, jwtOptions.secretOrKey);
        res.json({
          success: true,
          //token: token,
        });
        //incorrect password
      } else {
        res.status(401);
      }
    } catch (err) {
      res.json({
        succes: false,
      });
    }
  } else {
    res.status(401);
  }
});

//--------------------SIGNUP USER-----------------------------
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const hashpass = await bcrypt.hash(password, 10);

  const user = new User({
    firstName,
    lastName,
    email,
    password: hashpass,
  });
  //check that email is valid
  if (emailIsValid(email)) {
    //check if the email already exists
    var existing = null;
    try {
      existing = await User.findOne({ email: email });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    //save if email does not exist
    if (existing == null) {
      try {
        const newUser = await user.save();
        res.status(201).json(newUser); //201 successfully created an object
      } catch (err) {
        res.status(400).json({ message: err.message }); //400 client data error
      }
    }
    //send error if email exists already
    else {
      res.status(400).json({ message: "Email already exists" });
    }
  }
});

//-------------------------TEST-------------------------------
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);
module.exports = router;
