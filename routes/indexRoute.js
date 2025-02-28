const { Router } = require("express");
const {
  indexGet,
  indexCreateGet,
  indexCreatePost,
  indexDelete,
} = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", indexGet);

indexRouter.get("/create", indexCreateGet);

indexRouter.post("/create", indexCreatePost);

indexRouter.get("/delete/:id", indexDelete);

module.exports = indexRouter;
