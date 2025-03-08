const { body, validationResult } = require("express-validator");
const {
  getAllTrainers,
  getAllTrainersPokemons,
  getTrainerById,
  deleteTrainer,
  addTrainer,
  updateTrainer,
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
  const keys = ["trainer"];

  res.render("pokemon_trainers/trainers", {
    title: "All Pokemons' Trainers",
    trainers: trainers,
    keys: [...keys, "actions"],
  });
}

async function trainersPokemonsGet(req, res) {
  const { id } = req.params;
  const pokemons = await getAllTrainersPokemons(id);
  const keys = ["pokemon_name", "trainer", "type_name"];

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
      return res.status(400).render("pokemon_trainers/create", {
        title: "Create a new Trainer",
        errors: errors.array(),
      });
    }

    const body = req.body;
    const trainerName = body["trainer_name"];

    const result = await addTrainer(trainerName);

    if (result === false) {
      return res.status(400).render("pokemon_trainers/create", {
        title: "Create a new Trainer",
        errors: [
          {
            msg: "The trainer with the same name already exists.",
          },
        ],
      });
    }

    res.redirect("/trainers");
  },
];

async function trainersUpdateGet(req, res) {
  const { id } = req.params;
  const trainer = await getTrainerById(id);

  res.render("pokemon_trainers/update", {
    title: "Update a trainer",
    trainerName: trainer[0]["trainer"],
    trainerId: id,
    errors: [],
  });
}

const trainersUpdatePost = [
  validateTrainer,
  async function trainerUpdatePost(req, res) {
    const errors = validationResult(req);
    const { id } = req.params;

    if (!errors.isEmpty()) {
      const trainer = await getTrainerById(id);
      return res.status(400).render("pokemon_trainers/update", {
        title: "Update a Trainer",
        trainerId: id,
        trainerName: trainer[0]["trainer"],
        errors: errors.array(),
      });
    }

    const body = req.body;
    const trainerName = body["trainer_name"];

    const result = await updateTrainer(id, trainerName);

    if (result === false) {
      const trainer = await getTrainerById(id);
      return res.status(400).render("pokemon_trainers/update", {
        title: "Update a Trainer",
        trainerId: id,
        trainerName: trainer[0]["trainer"],
        errors: [
          {
            msg: "The trainer with the same name already exists.",
          },
        ],
      });
    }

    res.redirect("/trainers");
  },
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
  trainersUpdatePost,
  trainersDeleteGet,
};
