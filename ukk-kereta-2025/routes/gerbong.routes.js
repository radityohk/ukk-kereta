const express = require("express");
const r = express.Router();
const c = require("../controllers/GerbongController");
r.post("/", c.create);
r.get("/", c.findAll);
r.get("/:id", c.findOne);
r.put("/:id", c.update);
r.delete("/:id", c.delete);
module.exports = r;
