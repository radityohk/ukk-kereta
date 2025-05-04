const express = require("express");
const r = express.Router();
const c = require("../controllers/PemesananController");
const auth = require("../middlewares/auth");

r.post("/",       auth(["pelanggan"]), c.create);
r.get("/",        auth(["pelanggan"]), c.historiUser);
r.get("/nota/:id", auth(["pelanggan"]), c.nota);

module.exports = r;
