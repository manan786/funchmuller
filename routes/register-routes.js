const express = require("express");
const registerControllers = require("../controllers/register-controller");

const router = express.Router();

router.get("/users", registerControllers.Get_Influncer);
router.post("/influncer", registerControllers.Influncer_Register);
router.post("/Coldleads", registerControllers.Coldleads_Register);

module.exports = router;
