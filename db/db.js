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

async function getTrainerById(id) {
  const { rows } = await pool.query("SELECT * FROM trainers WHERE id = $1", [
    id,
  ]);

  return rows;
}

async function addTrainer(trainerName) {
  const { rows: trainers } = await pool.query("SELECT * FROM trainers");

  const trainerExist = trainers.find((trainer) => {
    return trainer["trainer"] == trainerName;
  });

  if (trainerExist) {
    return false;
  }

  await pool.query("INSERT INTO trainers (trainer) VALUES ($1)", [trainerName]);
}

async function updateTrainer(id, trainerName) {
  const { rows: trainers } = await pool.query("SELECT * FROM trainers");

  const trainerExist = trainers.find((trainer) => {
    return trainer["trainer"] == trainerName;
  });

  if (trainerExist) {
    return false;
  }

  await pool.query("UPDATE trainers SET trainer = $1 WHERE id = $2", [
    trainerName,
    id,
  ]);
}

async function deleteTrainer(id) {
  const { rows: trainers } = await pool.query(
    "SELECT * FROM trainers WHERE id = $1",
    [id]
  );

  if (!trainers) {
    return false;
  }

  await pool.query("DELETE FROM trainers WHERE id = $1", [id]);

  const { rows: pokemonsToDelete } = await pool.query(
    `
    SELECT * FROM pokemons WHERE pokemon_trainer_id = $1`,
    [id]
  );

  const idsOfPokemons = pokemonsToDelete.map((pokemon) => {
    return pokemon["id"];
  });

  await pool.query("DELETE FROM pokemons WHERE id = ANY ($1)", [idsOfPokemons]);
}

async function getAllTypesPokemons(typeId) {
  const { rows } = await pool.query(
    `
    SELECT pokemons.id, pokemon_name, trainer, type_name FROM pokemons
    INNER JOIN trainers
    ON trainers.id = pokemons.pokemon_trainer_id
    INNER JOIN types
    ON types.id = pokemon_type_id
    WHERE pokemon_type_id = $1
    ORDER BY id;
  `,
    [typeId]
  );

  return rows;
}

async function getTypeById(id) {
  const { rows } = await pool.query("SELECT * FROM types WHERE id = $1", [
    id,
  ]);

  return rows;
}

async function addType(typeName) {
  const { rows: types } = await pool.query("SELECT * FROM types");

  const typeExist = types.find((type) => {
    return type["type_name"] == typeName;
  });

  if (typeExist) {
    return false;
  }

  await pool.query("INSERT INTO types (type) VALUES ($1)", [typeName]);
}

async function updateType(id, typeName) {
  const { rows: types } = await pool.query("SELECT * FROM types");

  const typeExist = types.find((type) => {
    return type["type_name"] == typeName;
  });

  if (typeExist) {
    return false;
  }

  await pool.query("UPDATE types SET type = $1 WHERE id = $2", [typeName, id]);
}

async function deleteType(id) {
  const { rows: types } = await pool.query(
    "SELECT * FROM types WHERE id = $1",
    [id]
  );

  if (!types) {
    return false;
  }

  await pool.query("DELETE FROM types WHERE id = $1", [id]);

  const { rows: pokemonsToDelete } = await pool.query(
    `
    SELECT * FROM pokemons WHERE pokemon_type_id = $1`,
    [id]
  );

  const idsOfPokemons = pokemonsToDelete.map((pokemon) => {
    return pokemon["id"];
  });

  await pool.query("DELETE FROM pokemons WHERE id = ANY ($1)", [idsOfPokemons]);
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
  getTrainerById,
  addTrainer,
  updateTrainer,
  deleteTrainer,
  getAllTypesPokemons,
  addType,
  updateType,
  deleteType,
};
