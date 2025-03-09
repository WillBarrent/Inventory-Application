const path = require("node:path");
const express = require("express");
const app = express();

require("dotenv").config();

const assetsPath = path.join(__dirname, "public");

const indexRouter = require("./routes/indexRoute");
const trainersRoute = require("./routes/trainersRoute");
const typesRoute = require("./routes/typesRoute");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/trainers", trainersRoute);
app.use("/types", typesRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("App is listening on PORT", PORT);
});
