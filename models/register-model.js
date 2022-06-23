const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;
const Infuncer_Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telephone: { type: String, required: true },
  country: { type: String, required: true },
  twitter: { type: String, required: true },
  facebook: { type: String, required: true },
  instagram: { type: String, required: true },
  metamaskId: { type: String, required: true },
});

Infuncer_Schema.plugin(uniqueValidator);

const Coldlead_Schema = new Schema({
  email: { type: String, required: true, unique: true },
  facebook: { type: String, required: true },
  instagram: { type: String, required: true },
  twitter: { type: String, required: true },
});

Coldlead_Schema.plugin(uniqueValidator);

const Influncer = mongoose.model("Influncer_User", Infuncer_Schema);
const Coldleads = mongoose.model("Coldleads_User", Coldlead_Schema);

module.exports = { Influncer, Coldleads };
