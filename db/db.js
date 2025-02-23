const pool = require("./pool");

async function getAllPokemons() {
  const { rows } = pool.query(`
    SELECT * FROM pokemons
    INNER JOIN trainers
    ON trainers.id = pokemons.pokemon_trainer_id
    INNER JOIN types
    ON types.id = pokemon_type_id; 
  `);

  return rows;
}

module.exports = { getAllPokemons };
