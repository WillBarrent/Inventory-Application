const {
  getAllTrainers,
  getAllTrainersPokemons,
  getTrainerById,
  deleteTrainer,
} = require("../db/db");

async function trainersGet(req, res) {
  const trainers = await getAllTrainers();
  const keys = Object.keys(trainers[0]).slice(1);

  res.render("pokemon_trainers/trainers.ejs", {
    title: "All Pokemons' Trainers",
    trainers: trainers,
    keys: [...keys, "actions"],
  });
}

async function trainersPokemonsGet(req, res) {
  const { id } = req.params;
  const pokemons = await getAllTrainersPokemons(id);
  const keys = Object.keys(pokemons[0]).slice(1);

  res.render("index", {
    title: "Trainer's Pokemons",
    pokemons: pokemons,
    keys: [...keys, "actions"],
  });
}

async function trainersCreateGet(req, res) {
  res.render("pokemon_trainers/create", {
    title: "Create a new trainer",
    errors: [],
  });
}

async function trainersUpdateGet(req, res) {
  const { id } = req.params;
  const trainer = await getTrainerById(id);
  console.log(trainer);

  res.render("pokemon_trainers/update", {
    title: "Update a trainer",
    trainerName: trainer[0]["trainer"],
    errors: [],
  });
}

async function trainersDeleteGet(req, res) {
  const id = req.params["id"];

  const result = await deleteTrainer(id);

  res.redirect("/trainers");
}

module.exports = {
  trainersGet,
  trainersPokemonsGet,
  trainersCreateGet,
  trainersUpdateGet,
  trainersDeleteGet
};
