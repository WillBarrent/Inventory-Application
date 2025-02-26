const { Router } = require("express");
const {
  indexGet,
  indexCreateGet,
  indexCreatePost,
} = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", indexGet);

indexRouter.get("/create", indexCreateGet);

indexRouter.post("/create", indexCreatePost);

module.exports = indexRouter;
