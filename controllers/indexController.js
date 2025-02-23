const { getAllPokemons } = require("../db/db");

async function indexGet(req, res) {
  const pokemons = await getAllPokemons();
  const keys = Object.keys(pokemons[0]);

  res.render("index", {
    title: "All Pokemons",
    pokemons: pokemons,
    keys: keys,
  });
}

module.exports = {
  indexGet,
};
