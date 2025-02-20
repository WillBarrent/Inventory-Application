const path = require("node:path");
const express = require("express");
const app = express();

const assetsPath = path.join(__dirname, "public");

require("dotenv").config();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("App is listening on PORT", PORT);
});
