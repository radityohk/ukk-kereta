
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Gerbong extends Model {}
  Gerbong.init({
    nama: DataTypes.STRING,
    kelas: DataTypes.STRING,
    keretaId: DataTypes.INTEGER
  }, { sequelize, modelName: "Gerbong" });
  return Gerbong;
};

