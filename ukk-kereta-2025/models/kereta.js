
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kereta extends Model {}
  Kereta.init({
    nama: DataTypes.STRING,
    kode: DataTypes.STRING
  }, { sequelize, modelName: "Kereta" });
  return Kereta;
};

