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

//----------------------LOGIN---------------------------------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    //find user by email
    console.log("trying to login");

    const user = await User.findOne({
      email: email,
    });
    //compare passwords
    const match = await bcrypt.compare(password, user.password);
    //found a match
    if (match) {
      const token = jwt.sign(match, jwtOptions.secretOrKey);
      res.json({
        success: true,
        token: token,
      });
      //incorrect password
    } else {
      res.status(401).json({ success: false });
    }
  } catch (err) {
    console.log("not found");
    res.status(401).json({
      succes: false,
    });
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
      res.status(201).json({ message: "success" }); //201 successfully created an object
    } catch (err) {
      res.status(400).json({ message: err.message }); //400 client data error
    }
  }
  //send error if email exists already
  else {
    res.status(400).json({ message: "Email already exists" });
  }
});

//-------------------------CHECK IF USER IS LOGGED IN-------------------------------
router.get(
  "/checkLogin",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log(req.user.id);
    res.json({
      success: true,
      user: {
        id: req.user.id,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
      },
      message: "Authenticated user",
    });
  }
);
module.exports = router;
