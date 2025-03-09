const { Router } = require("express");
const {
  typesGet,
  typesPokemonsGet,
  typesCreateGet,
  typesUpdateGet,
  typesCreatePost,
  typesUpdatePost,
  typesDeleteGet,
} = require("../controllers/typesController");

const typesRoute = Router();

typesRoute.get("/", typesGet);
typesRoute.get("/create", typesCreateGet);
typesRoute.post("/create", typesCreatePost);
typesRoute.get("/update/:id", typesUpdateGet);
typesRoute.post("/update/:id", typesUpdatePost);
typesRoute.get("/delete/:id", typesDeleteGet);
typesRoute.get("/:id", typesPokemonsGet);

module.exports = typesRoute;
