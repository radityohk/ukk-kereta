const { Jadwal } = require("../models");

exports.create = (req, res) =>
  Jadwal.create(req.body)
    .then((r) => res.status(201).json(r))
    .catch((e) => res.status(400).json(e));
exports.findAll = (req, res) =>
  Jadwal.findAll({ include: ["Kereta"] }).then((r) => res.json(r));
exports.findOne = (req, res) =>
  Jadwal.findByPk(req.params.id).then((r) =>
    r ? res.json(r) : res.sendStatus(404)
  );
exports.update = (req, res) =>
  Jadwal.update(req.body, { where: { id: req.params.id } }).then(() =>
    res.json({ message: "Updated" })
  );
exports.delete = (req, res) =>
  Jadwal.destroy({ where: { id: req.params.id } }).then(() =>
    res.json({ message: "Deleted" })
  );
