const { body } = require("express-validator");
const { getAllPokemons, getAllTrainers, getAllTypes } = require("../db/db");

const validatePokemon = [
  body("pokemon_name")
    .notEmpty()
    .withMessage("Pokemon's name must not be empty.")
    .isAlpha()
    .withMessage("Pokemon's name must only contain alphabet letters."),
];

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

const indexCreatePost = [
  validatePokemon,
  async function indexCreatePost(req, res) {
    res.redirect("/");
  },
];

module.exports = {
  indexGet,
  indexCreateGet,
  indexCreatePost,
};
