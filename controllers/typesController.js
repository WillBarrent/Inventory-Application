const { getAllTypes, getAllTypesPokemons, getTypeById } = require("../db/db");

async function typesGet(req, res) {
  const types = await getAllTypes();
  const keys = ["type"];

  res.render("./pokemon_types/types.ejs", {
    title: "All Pokemons' Types",
    types: types,
    keys: [...keys, "actions"],
  });
}

async function typesPokemonsGet(req, res) {
  const { id } = req.params;
  const pokemons = await getAllTypesPokemons(id);
  const keys = ["pokemon_name", "trainer", "type_name"];

  res.render("index", {
    title: "Pokemons by type",
    pokemons: pokemons,
    keys: [...keys, "actions"],
  });
}

async function typesCreateGet(req, res) {
  res.render("pokemon_types/create", {
    title: "Create a new type",
    errors: [],
  });
}

async function typesUpdateGet(req, res) {
  const { id } = req.params;
  const type = await getTypeById(id);

  res.render("pokemon_types/update", {
    title: "Update a type",
    typeName: type[0]["type_name"],
    typeId: id,
    errors: [],
  });
}

module.exports = { typesGet, typesPokemonsGet, typesCreateGet, typesUpdateGet };
