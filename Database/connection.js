const mongoose = require("mongoose");

var uri =
  "mongodb+srv://ditechabdul:ditechabdul@frunckmuller.ugjjj.mongodb.net/frunckmuller";
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected Successfuly");
  })
  .catch((err) => {
    console.log(err, "COnnection Failed");
  });
