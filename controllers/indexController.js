const { getAllPokemons, getAllTrainers, getAllTypes } = require("../db/db");



async function indexGet(req, res) {
  const pokemons = await getAllPokemons();
  const keys = Object.keys(pokemons[0]);

  res.render("index", {
    title: "All Pokemons",
    pokemons: pokemons,
    keys: [...keys, "actions"],
  });
}

async function indexCreateGet(req, res) {
  const trainers = await getAllTrainers();
  const types = await getAllTypes();

  res.render("pokemons/create", {
    title: "Create a new Pokemon",
    trainers: trainers,
    types: types,
  });
}

async function indexCreatePost(req, res) {
  res.redirect("/");
}

module.exports = {
  indexGet,
  indexCreateGet,
  indexCreatePost,
};
