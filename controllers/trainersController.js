const { body, validationResult } = require("express-validator");
const {
  getAllTrainers,
  getAllTrainersPokemons,
  getTrainerById,
  deleteTrainer,
  addTrainer,
} = require("../db/db");

const validateTrainer = [
  body("trainer_name")
    .notEmpty()
    .withMessage("Trainer's name cannot be empty")
    .isAlpha()
    .withMessage("Trainer's name must only contain alphabet letters."),
];

async function trainersGet(req, res) {
  const trainers = await getAllTrainers();
  const keys = Object.keys(trainers[0]).slice(1);

  res.render("pokemon_trainers/trainers", {
    title: "All Pokemons' Trainers",
    trainers: trainers,
    keys: [...keys, "actions"],
  });
}

async function trainersPokemonsGet(req, res) {
  const { id } = req.params;
  const pokemons = await getAllTrainersPokemons(id);
  const keys = Object.keys(pokemons[0]).slice(1);

  res.render("index", {
    title: "Trainer's Pokemons",
    pokemons: pokemons,
    keys: [...keys, "actions"],
  });
}

async function trainersCreateGet(req, res) {
  res.render("pokemon_trainers/create", {
    title: "Create a new trainer",
    errors: [],
  });
}

const trainersCreatePost = [
  validateTrainer,
  async function trainerCreatePost(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("pokemons/create", {
        title: "Create a new Trainer",
        errors: errors.array(),
      });
    }

    const body = req.body;
    const trainerName = body["trainer_name"];

    const result = await addTrainer(trainerName);

    if (result === false) {
      return res.status(400).render("pokemons/create", {
        title: "Create a new Trainer",
        errors: [
          {
            msg: "The trainer with the same name already exists.",
          },
        ],
      });
    }

    const trainers = await getAllTrainers();
    const keys = Object.keys(trainers[0]).slice(1);

    res.render("pokemon_trainers/trainers", {
      title: "All Pokemons' Trainers",
      trainers: trainers,
      keys: [...keys, "actions"],
    });
  },
];

async function trainersUpdateGet(req, res) {
  const { id } = req.params;
  const trainer = await getTrainerById(id);
  console.log(trainer);

  res.render("pokemon_trainers/update", {
    title: "Update a trainer",
    trainerName: trainer[0]["trainer"],
    errors: [],
  });
}

const trainersUpdatePost = [
  validateTrainer,
  async function trainerUpdatePost(req, res) {},
];

async function trainersDeleteGet(req, res) {
  const id = req.params["id"];

  const result = await deleteTrainer(id);

  res.redirect("/trainers");
}

module.exports = {
  trainersGet,
  trainersPokemonsGet,
  trainersCreateGet,
  trainersCreatePost,
  trainersUpdateGet,
  trainersDeleteGet,
};
