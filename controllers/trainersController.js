const { getAllTrainers, getAllTrainersPokemons } = require("../db/db");

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

module.exports = {
  trainersGet,
  trainersPokemonsGet,
};
