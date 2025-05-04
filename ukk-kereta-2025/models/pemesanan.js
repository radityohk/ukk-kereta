
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pemesanan extends Model {}
  Pemesanan.init({
    userId: DataTypes.INTEGER,
    jadwalId: DataTypes.INTEGER,
    tanggal: DataTypes.DATE,
    total: DataTypes.INTEGER
  }, { sequelize, modelName: "Pemesanan" });
  return Pemesanan;
};

