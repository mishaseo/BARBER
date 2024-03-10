//using express's router
const { Router } = require("express");
const router = Router();
const User = require("./schemas/user");
//for hashing passwords
const bcrypt = require("bcrypt");

function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

//SIGNUP USER
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const encryptedPass = await bcrypt.hash(password, 10);
  const user = new User({
    firstName,
    lastName,
    email,
    password: encryptedPass,
  });
  if (emailIsValid(email)) {
    var existing = null;
    try {
      existing = await Subscriber.findOne({ email: email });
    } catch (err) {}
    if (existing !== null) {
      try {
        const newUser = await user.save();
        res.status(201).json(newUser); //successfully created an object
      } catch (err) {
        res.status(400).json({ message: err.message }); //client data error
      }
    } else {
      res.status(400).json({ message: "Email already exists" });
    }
  }
});

module.exports = router;
