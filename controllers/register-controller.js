require("../Database/connection");
const HttpsError = require("../models/http-error");
const { Influncer, Coldleads } = require("../models/register-model");

// getting Influncer Users
const Influncer_getUsers = async (req, res, next) => {
  let users;
  try {
    users = await Influncer.find().exec();
  } catch (err) {
    return next(
      new HttpsError(
        "Something Went Wrong on server,Could not find users.",
        500
      )
    );
  }
  if (!users) {
    next(new HttpsError("Could not find place for the provided id.", 404));
  } else {
    res
      .status(200)
      .json({ users: users.map((u) => u.toObject({ getters: true })) });
  }
};
// Influncer register user
const Influncer_register = async (req, res, next) => {
  const {
    name,
    email,
    telephone,
    country,
    twitter,
    facebook,
    instagram,
    metamaskId,
  } = req.body;

  // checking if user already exists
  let existingUser;
  try {
    existingUser = await Influncer.findOne({ email: email });
  } catch (err) {
    return next(new HttpsError("Something went wrong signup users", 500));
  }
  console.log(existingUser);
  if (existingUser) {
    return next(
      new HttpsError("Email Already Exists, Please try to login.", 422)
    );
  }

  const createUser = new Influncer({
    name,
    email,
    telephone,
    country,
    twitter,
    facebook,
    instagram,
    metamaskId,
  });

  try {
    await createUser.save();
    console.log("tried");
  } catch (err) {
    console.log("failed");
    return next(new HttpsError("Registering failed, Please try again.", 500));
  }

  res.status(201).json({ user: createUser.toObject({ getters: true }) });
};
// Influncer register user
const Coldleads_register = async (req, res, next) => {
  const { email, twitter, facebook, instagram } = req.body;
  // checking if user already exists
  let existingUser;
  try {
    existingUser = await Coldleads.findOne({ email: email });
  } catch (err) {
    return next(new HttpsError("Something went wrong signup users", 500));
  }
  console.log(existingUser);
  if (existingUser) {
    return next(
      new HttpsError("Email Already Exists, Please try to login.", 422)
    );
  }

  const createUser = new Coldleads({
    email,
    twitter,
    facebook,
    instagram,
  });

  try {
    await createUser.save();
    console.log("tried");
  } catch (err) {
    console.log("failed");
    return next(new HttpsError("Registering failed, Please try again.", 500));
  }

  res.status(201).json({ user: createUser.toObject({ getters: true }) });
};

exports.Get_Influncer = Influncer_getUsers;
exports.Influncer_Register = Influncer_register;
exports.Coldleads_Register = Coldleads_register;
