const { body, validationResult } = require("express-validator");
const {
  getAllPokemons,
  getAllTrainers,
  getAllTypes,
  addPokemon,
  deletePokemon,
  getPokemonById,
  updatePokemon,
} = require("../db/db");

const validatePokemon = [
  body("pokemon_name")
    .notEmpty()
    .withMessage("Pokemon's name must not be empty.")
    .isAlpha()
    .withMessage("Pokemon's name must only contain alphabet letters."),
];

async function indexGet(req, res) {
  const pokemons = await getAllPokemons();
  const keys = Object.keys(pokemons[0]).slice(1);

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
    errors: [],
  });
}

const indexCreatePost = [
  validatePokemon,
  async function indexCreatePost(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const trainers = await getAllTrainers();
      const types = await getAllTypes();

      return res.status(400).render("pokemons/create", {
        title: "Create a new Pokemon",
        trainers: trainers,
        types: types,
        errors: errors.array(),
      });
    }

    const body = req.body;
    const pokemonName = body["pokemon_name"];
    const trainerId = body["trainer"];
    const typeId = body["type"];

    const result = await addPokemon({ pokemonName, trainerId, typeId });

    if (result === false) {
      const trainers = await getAllTrainers();
      const types = await getAllTypes();

      return res.render("pokemons/create", {
        title: "Create a new Pokemon",
        trainers: trainers,
        types: types,
        errors: [
          {
            msg: "It seems you can't create pokemon with these combinations of data",
          },
        ],
      });
    }

    res.redirect("/");
  },
];

async function indexUpdateGet(req, res) {
  const pokemonId = req.params["id"];

  const pokemon = await getPokemonById(pokemonId);

  const trainers = await getAllTrainers();
  const types = await getAllTypes();

  const pokemonsTrainer = trainers.find(
    (trainer) => trainer["id"] == pokemon[0]["pokemon_trainer_id"]
  );
  const pokemonsType = types.find(
    (type) => type["id"] == pokemon[0]["pokemon_type_id"]
  );

  res.render("pokemons/update", {
    title: "Update Pokemon's data",
    trainers: trainers,
    types: types,
    pokemonsTrainer: pokemonsTrainer,
    pokemonsType: pokemonsType,
    pokemonName: pokemon[0]["pokemon_name"],
    pokemonId: pokemonId,
    errors: [],
  });
}

const indexUpdatePost = [
  validatePokemon,
  async function indexUpdatePost(req, res) {
    const pokemonId = req.params["id"];
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const pokemon = await getPokemonById(pokemonId);

      const trainers = await getAllTrainers();
      const types = await getAllTypes();

      const pokemonsTrainer = trainers.find(
        (trainer) => trainer["id"] == pokemon[0]["pokemon_trainer_id"]
      );
      const pokemonsType = types.find(
        (type) => type["id"] == pokemon[0]["pokemon_type_id"]
      );

      return res.status(400).render("pokemons/update", {
        title: "Update Pokemon's data",
        trainers: trainers,
        types: types,
        pokemonsTrainer: pokemonsTrainer,
        pokemonsType: pokemonsType,
        pokemonName: pokemon[0]["pokemon_name"],
        pokemonId: pokemonId,
        errors: errors.array(),
      });
    }

    const body = req.body;
    const pokemonName = body["pokemon_name"];
    const trainerId = body["trainer"];
    const typeId = body["type"];

    const result = await updatePokemon({
      pokemonId,
      pokemonName,
      trainerId,
      typeId,
    });

    if (result === false) {
      const pokemon = await getPokemonById(pokemonId);

      const trainers = await getAllTrainers();
      const types = await getAllTypes();

      const pokemonsTrainer = trainers.find(
        (trainer) => trainer["id"] == pokemon[0]["pokemon_trainer_id"]
      );
      const pokemonsType = types.find(
        (type) => type["id"] == pokemon[0]["pokemon_type_id"]
      );

      return res.status(400).render("pokemons/update", {
        title: "Update Pokemon's data",
        trainers: trainers,
        types: types,
        pokemonsTrainer: pokemonsTrainer,
        pokemonsType: pokemonsType,
        pokemonName: pokemon[0]["pokemon_name"],
        pokemonId: pokemonId,
        errors: [
          {
            msg: "It seems you can't update pokemon with these combinations of data",
          },
        ],
      });
    }

    res.redirect("/");
  },
];

async function indexDelete(req, res) {
  const pokemonId = req.params["id"];

  const result = await deletePokemon(pokemonId);

  res.redirect("/");
}

module.exports = {
  indexGet,
  indexCreateGet,
  indexCreatePost,
  indexUpdateGet,
  indexUpdatePost,
  indexDelete,
};
