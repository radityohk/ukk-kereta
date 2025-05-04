const { Kursi } = require("../models");
exports.create = (req, res) => Kursi.create(req.body).then(r=>res.status(201).json(r)).catch(e=>res.status(400).json(e));
exports.findAll = (req, res) => Kursi.findAll().then(r=>res.json(r));
exports.findOne = (req, res) => Kursi.findByPk(req.params.id).then(r=>r ? res.json(r) : res.sendStatus(404));
exports.update = (req, res) => Kursi.update(req.body,{where:{id:req.params.id}}).then(()=>res.json({message:"Updated"}));
exports.delete = (req, res) => Kursi.destroy({where:{id:req.params.id}}).then(()=>res.json({message:"Deleted"}));
