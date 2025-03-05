const { Router } = require("express");
const {
  trainersGet,
  trainersPokemonsGet,
} = require("../controllers/trainersController");

const trainersRoute = Router();

trainersRoute.get("/", trainersGet);
trainersRoute.get("/:id", trainersPokemonsGet);

module.exports = trainersRoute;
