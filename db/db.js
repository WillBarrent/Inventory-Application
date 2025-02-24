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

module.exports = { getAllPokemons, getAllTrainers, getAllTypes };
