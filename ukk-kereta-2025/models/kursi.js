
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kursi extends Model {}
  Kursi.init({
    nomor: DataTypes.STRING,
    gerbongId: DataTypes.INTEGER
  }, { sequelize, modelName: "Kursi" });
  return Kursi;
};

