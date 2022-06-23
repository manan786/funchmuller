const express = require("express");
const bodyParser = require("body-parser");
const RegisterRoutes = require("./routes/register-routes");
const HttpError = require("./models/http-error");
var cors = require("cors");
const app = express();

app.use(bodyParser.json()); // it is just used for parse post data which is comming from front end, So that we can read and use that data.

app.use(cors());
app.use("/register", RegisterRoutes);
app.get("/test", (req, res) => res.send("Hello  OK World!"));

// if route not found
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  next(error);
});

//server error
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

// PORT
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
// app.listen();
