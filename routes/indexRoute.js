const { Router } = require("express");
const {
  indexGet,
  indexCreateGet,
  indexCreatePost,
  indexDelete,
  indexUpdateGet,
  indexUpdatePost,
} = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", indexGet);

indexRouter.get("/create", indexCreateGet);
indexRouter.post("/create", indexCreatePost);

indexRouter.get("/update/:id", indexUpdateGet);
indexRouter.post("/update/:id", indexUpdatePost);

indexRouter.get("/delete/:id", indexDelete);

module.exports = indexRouter;
