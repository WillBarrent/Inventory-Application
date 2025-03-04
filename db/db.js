const pool = require("./pool");

async function getAllPokemons() {
  const { rows } = await pool.query(`
    SELECT pokemons.id, pokemon_name, trainer, type_name FROM pokemons
    INNER JOIN trainers
    ON trainers.id = pokemons.pokemon_trainer_id
    INNER JOIN types
    ON types.id = pokemon_type_id
    ORDER BY id;
  `);

  return rows;
}

async function getPokemonById(pokemonId) {
  const { rows } = await pool.query("SELECT * FROM pokemons WHERE id = $1", [
    pokemonId,
  ]);

  return rows;
}

async function getAllTrainers() {
  const { rows } = await pool.query("SELECT * FROM trainers");
  return rows;
}

async function getAllTypes() {
  const { rows } = await pool.query("SELECT * FROM types");
  return rows;
}

async function addPokemon({ pokemonName, trainerId, typeId }) {
  const { rows: pokemons } = await pool.query("SELECT * FROM pokemons");

  const pokemonExist = pokemons.find((pokemon) => {
    return pokemon["pokemon_name"] == pokemonName;
  });

  if (
    pokemonExist &&
    !(
      pokemonExist["pokemon_name"] == pokemonName &&
      pokemonExist["pokemon_trainer_id"] != trainerId &&
      pokemonExist["pokemon_type_id"] == typeId
    )
  ) {
    return false;
  }

  await pool.query(
    `INSERT INTO pokemons
    (pokemon_name, pokemon_trainer_id, pokemon_type_id)
    VALUES ($1, $2, $3)`,
    [pokemonName, trainerId, typeId]
  );
}

async function updatePokemon({ pokemonId, pokemonName, trainerId, typeId }) {
  const { rows: pokemons } = await pool.query("SELECT * FROM pokemons");

  const pokemonExist = pokemons.find((pokemon) => {
    return pokemon["pokemon_name"] == pokemonName;
  });

  if (
    pokemonExist &&
    !(
      pokemonExist["pokemon_name"] == pokemonName &&
      pokemonExist["pokemon_trainer_id"] != trainerId
    )
  ) {
    return false;
  }

  await pool.query(
    `UPDATE pokemons SET
        pokemon_name = $1,
        pokemon_trainer_id = $2,
        pokemon_type_id = $3
        WHERE id = $4`,
    [pokemonName, trainerId, typeId, pokemonId]
  );
}

async function deletePokemon(pokemonId) {
  const { rows: pokemons } = await pool.query(
    "SELECT * FROM pokemons WHERE id = $1",
    [pokemonId]
  );

  if (!pokemons) {
    return false;
  }

  await pool.query("DELETE FROM pokemons WHERE id = $1", [pokemonId]);
}

async function getAllTrainersPokemons(trainerId) {
  const { rows } = await pool.query(
    `
    SELECT pokemons.id, pokemon_name, trainer, type_name FROM pokemons
    INNER JOIN trainers
    ON trainers.id = pokemons.pokemon_trainer_id
    INNER JOIN types
    ON types.id = pokemon_type_id
    WHERE pokemon_trainer_id = $1
    ORDER BY id;
  `,
    [trainerId]
  );

  return rows;
}

module.exports = {
  getAllPokemons,
  getPokemonById,
  getAllTrainers,
  getAllTypes,
  addPokemon,
  updatePokemon,
  deletePokemon,
  getAllTrainersPokemons,
};
