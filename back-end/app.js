// import and instantiate express
const express = require("express"); // CommonJS import style!
const app = express(); // instantiate an Express object
var cors = require("cors");
require("dotenv").config(); //load all enviornment variables
const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//----------------------------mongodb----------------------------
const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASE_URL, { dbName: "BarberUp" })
  .then(() => {
    console.log("Connection to the Atlas Cluster is successful!");
  })
  .catch((err) => console.error(err));

//----------------------------middleware----------------------------
app.use(express.json()); //allows us to post and get json from out endpoints

// ----------------------------route logic----------------------------
const routes = require("./routes");
app.use("/", routes);

// export the express app we created to make it available to other modules
module.exports = app;
