
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Penumpang extends Model {}
  Penumpang.init({
    pemesananId: DataTypes.INTEGER,
    nama: DataTypes.STRING,
    no_identitas: DataTypes.STRING,
    kursiId: DataTypes.INTEGER,
    harga: DataTypes.INTEGER
  }, { sequelize, modelName: "Penumpang" });
  return Penumpang;
};

