const { Router } = require("express");
const {
  trainersGet,
  trainersPokemonsGet,
  trainersCreateGet,
  trainersUpdateGet,
  trainersDeleteGet,
  trainersCreatePost,
  trainersUpdatePost,
} = require("../controllers/trainersController");

const trainersRoute = Router();

trainersRoute.get("/", trainersGet);
trainersRoute.get("/create", trainersCreateGet);
trainersRoute.post("/create", trainersCreatePost);
trainersRoute.get("/update/:id", trainersUpdateGet);
trainersRoute.post("/update/:id", trainersUpdatePost);
trainersRoute.get("/delete/:id", trainersDeleteGet);
trainersRoute.get("/:id", trainersPokemonsGet);

module.exports = trainersRoute;
