const express = require("express");
const patientGroupInfo = require("./controllers/patientGroupInfo");
const patientRegister = require("./controllers/register");
const login = require("./controllers/patientLogin");
const isAuthenticated = require("../../middleware/auth");
const resetCode = require("./controllers/resetCode");
const otpVerification = require("./controllers/otpVerification");
const changePassword = require("./controllers/changePassword");
const addAddress = require("./controllers/addAddress");
const updateAddress = require("./controllers/updateAddress");
const deleteAddress = require("./controllers/deleteAddress");
const updateProfile = require("./controllers/updateProfile");
const deletePatient = require("./controllers/deletePatient");
const getPatientInfo = require("./controllers/getPatientInfo");
const getAddress = require("./controllers/getAddress");
const getAddressById = require("./controllers/getAddressById");
const slotBooking = require("./controllers/slotBooking");
const patientRoute = express.Router();
patientRoute.post("/register", patientRegister);
patientRoute.post("/login", login);

// patientRoute.use(isAuthenticated);
patientRoute.get("/:userId", getPatientInfo);
patientRoute.post("/getInfo", patientGroupInfo);
patientRoute.post("/resetCode", resetCode);
patientRoute.post("/otpVerification", otpVerification);
patientRoute.post("/changePassword", changePassword);
patientRoute.post("/:userId/addAddress", addAddress);
patientRoute.patch("/:userId/address/:addressId", updateAddress);
patientRoute.delete("/:userId/address/:addressId", deleteAddress);
patientRoute.get("/address/:id", getAddress);
patientRoute.get("/address/:userId/:addressId", getAddressById);
patientRoute.patch("/updateProfile/:userId", updateProfile);
patientRoute.post("/slot/:pid/:did", slotBooking);
patientRoute.delete("/deleteProfile/:userId", deletePatient);

module.exports = patientRoute;