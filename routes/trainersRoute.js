const { Router } = require("express");
const { trainersGet } = require("../controllers/trainersController");

const trainersRoute = Router();

trainersRoute.get("/", trainersGet);

module.exports = trainersRoute;