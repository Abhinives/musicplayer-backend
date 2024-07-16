const isAuthenticated = require("../../middleware/auth");
const addMedicine = require("./controllers/addMedicine");
const searchMedicine = require("./controllers/searchMedicine");

const medicineRoute = require("express").Router();
// medicineRoute.use(isAuthenticated);
medicineRoute.post("/", addMedicine);
medicineRoute.get("/", searchMedicine);
medicineRoute.get("/:letter", searchMedicine);

module.exports = medicineRoute;
