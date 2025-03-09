const { body, validationResult } = require("express-validator");
const {
  getAllTypes,
  getAllTypesPokemons,
  getTypeById,
  addType,
  updateType,
  deleteType,
} = require("../db/db");

const validateType = [
  body("type_name")
    .notEmpty()
    .withMessage("Type's name cannot be empty")
    .isAlpha()
    .withMessage("Type's name must only contain alphabet letters."),
];

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

const typesCreatePost = [
  validateType,
  async function typeCreatePost(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("pokemon_types/create", {
        title: "Create a new Type",
        errors: errors.array(),
      });
    }

    const body = req.body;
    const typeName = body["type_name"];

    const result = await addType(typeName);

    if (result === false) {
      return res.status(400).render("pokemon_types/create", {
        title: "Create a new Type",
        errors: [
          {
            msg: "The type already exists.",
          },
        ],
      });
    }

    res.redirect("/types");
  },
];

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

const typesUpdatePost = [
  validateType,
  async function typeUpdatePost(req, res) {
    const errors = validationResult(req);
    const { id } = req.params;

    if (!errors.isEmpty()) {
      const type = await getTypeById(id);
      return res.status(400).render("pokemon_types/update", {
        title: "Update a Type",
        typeName: type[0]["type_name"],
        typeId: id,
        errors: errors.array(),
      });
    }

    const body = req.body;
    const typeName = body["type_name"];

    const result = await updateType(id, typeName);

    if (result === false) {
      const type = await getTypeById(id);
      return res.status(400).render("pokemon_types/update", {
        title: "Update a Type",
        typeName: type[0]["type_name"],
        typeId: id,
        errors: [
          {
            msg: "The type already exists.",
          },
        ],
      });
    }

    res.redirect("/types");
  },
];

async function typesDeleteGet(req, res) {
  const id = req.params["id"];

  const result = await deleteType(id);

  res.redirect("/types");
}

module.exports = {
  typesGet,
  typesPokemonsGet,
  typesCreateGet,
  typesUpdateGet,
  typesCreatePost,
  typesUpdatePost,
  typesDeleteGet,
};
