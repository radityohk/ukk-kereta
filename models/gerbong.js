"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Gerbong extends Model {
    static associate(models) {
      Gerbong.belongsTo(models.Kereta, { foreignKey: "id_kereta", as: "keretas" });
      Gerbong.hasMany(models.Kursi, { foreignKey: "id_gerbong", as: "kursis" });
    }
  }
  Gerbong.init(
    {
      nama_gerbong: DataTypes.STRING,
      kuota: DataTypes.INTEGER,
      id_kereta: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Gerbong",
    }
  );
  return Gerbong;
};