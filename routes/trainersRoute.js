const { Router } = require("express");
const {
  trainersGet,
  trainersPokemonsGet,
  trainersCreateGet,
  trainersUpdateGet,
  trainersDeleteGet,
} = require("../controllers/trainersController");

const trainersRoute = Router();

trainersRoute.get("/", trainersGet);
trainersRoute.get("/create", trainersCreateGet);
trainersRoute.get("/update/:id", trainersUpdateGet);
trainersRoute.get("/delete/:id", trainersDeleteGet);
trainersRoute.get("/:id", trainersPokemonsGet);

module.exports = trainersRoute;
