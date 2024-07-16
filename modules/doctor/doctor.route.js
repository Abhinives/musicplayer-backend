const express = require("express");
const register = require("./controllers/register");
const doctorLogin = require("./controllers/login");
const slotDetails = require("./controllers/slotDetails");
const patientUpdate = require("./controllers/patientUpdate");
const isAuthenticated = require("../../middleware/auth");
const doctorRoute = express.Router();

doctorRoute.post("/register", register);
doctorRoute.post("/login", doctorLogin);
doctorRoute.use(isAuthenticated);
doctorRoute.get("/slotDetails/:id", slotDetails);
doctorRoute.post("/patientUpdate/:id", patientUpdate);
module.exports = doctorRoute;
