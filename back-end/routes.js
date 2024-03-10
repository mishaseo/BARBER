//using express's router
const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  console.log("here");
  res.send("HI");
});
module.exports = router;
