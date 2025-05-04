
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Jadwal extends Model {}
  Jadwal.init({
    keretaId: DataTypes.INTEGER,
    asal: DataTypes.STRING,
    tujuan: DataTypes.STRING,
    tanggal: DataTypes.DATE,
    jam: DataTypes.STRING,
    harga: DataTypes.INTEGER,
    kuota: DataTypes.INTEGER
  }, { sequelize, modelName: "Jadwal" });
  return Jadwal;
};

