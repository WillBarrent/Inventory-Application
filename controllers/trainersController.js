const { getAllTrainers } = require("../db/db");

async function trainersGet(req, res) {
  const trainers = await getAllTrainers();
  const keys = Object.keys(trainers[0]).slice(1);

  res.render("pokemon_trainers/trainers.ejs", {
    title: "All Pokemons' Trainers",
    trainers: trainers,
    keys: [...keys, "actions"],
  });
}

module.exports = {
  trainersGet,
};
