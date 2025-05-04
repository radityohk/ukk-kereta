"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kereta extends Model {
    static associate(models) {
      Kereta.hasMany(models.Gerbong, { foreignKey: "id_kereta", as: "gerbongs" });
      Kereta.hasMany(models.Jadwal, { foreignKey: "id_kereta", as: "jadwals" });
    }
  }
  Kereta.init(
    {
      nama_kereta: DataTypes.STRING,
      deskripsi: DataTypes.TEXT,
      kelas: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Kereta",
      tableName: 'Keretas',
      freezeTableName: true,
    }
  );
  return Kereta;
};