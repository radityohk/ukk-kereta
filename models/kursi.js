"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kursi extends Model {
    static associate(models) {
      Kursi.belongsTo(models.Gerbong, { foreignKey: "id_gerbong", as: "gerbong" });
      Kursi.hasMany(models.Penumpang, { foreignKey: "id_kursi", as: "penumpangs" });
    }
  }
  Kursi.init(
    {
      no_kursi: DataTypes.STRING,
      id_gerbong: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Kursi",
    }
  );
  return Kursi;
};