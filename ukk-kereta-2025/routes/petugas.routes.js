const express = require("express");
const r = express.Router();
const c = require("../controllers/PetugasController");
const auth = require("../middlewares/auth");

r.get("/histori", auth(["petugas"]), c.historiAll);
r.get("/rekap",   auth(["petugas"]), c.rekapBulanan);

module.exports = r;
