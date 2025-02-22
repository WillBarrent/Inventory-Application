async function indexGet(req, res) {
  res.render("index", {
    title: "Inventory App",
  });
}

module.exports = {
    indexGet,
};