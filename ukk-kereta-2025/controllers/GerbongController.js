const { Gerbong } = require("../models");
exports.create = (req, res) => Gerbong.create(req.body).then(r=>res.status(201).json(r)).catch(e=>res.status(400).json(e));
exports.findAll = (req, res) => Gerbong.findAll().then(r=>res.json(r));
exports.findOne = (req, res) => Gerbong.findByPk(req.params.id).then(r=>r ? res.json(r) : res.sendStatus(404));
exports.update = (req, res) => Gerbong.update(req.body,{where:{id:req.params.id}}).then(()=>res.json({message:"Updated"}));
exports.delete = (req, res) => Gerbong.destroy({where:{id:req.params.id}}).then(()=>res.json({message:"Deleted"}));
