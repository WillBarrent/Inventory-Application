const pool = require("./pool");

async function getAllPokemons() {
  const { rows } = await pool.query(`
    SELECT pokemons.id, pokemon_name, trainer, type_name FROM pokemons
    INNER JOIN trainers
    ON trainers.id = pokemons.pokemon_trainer_id
    INNER JOIN types
    ON types.id = pokemon_type_id; 
  `);

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
    return (
      (pokemon["pokemon_name"] == pokemonName &&
        pokemon["pokemon_trainer_id"] == trainerId) ||
      (pokemon["pokemon_name"] == pokemonName &&
        pokemon["pokemon_type_id"] == typeId)
    );
  });

  if (pokemonExist) {
    return false;
  }

  await pool.query(
    `INSERT INTO pokemons
    (pokemon_name, pokemon_trainer_id, pokemon_type_id)
    VALUES ($1, $2, $3)`,
    [pokemonName, trainerId, typeId]
  );
}

module.exports = { getAllPokemons, getAllTrainers, getAllTypes, addPokemon };
