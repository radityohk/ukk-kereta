"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Penumpang extends Model {
    static associate(models) {
      Penumpang.belongsTo(models.Pembelian_tiket, { foreignKey: "id_pembelian", as: "pembelian" });
      Penumpang.belongsTo(models.Kursi, { foreignKey: "id_kursi", as: "kursi" });
    }
  }
  Penumpang.init(
    {
      NIK: DataTypes.STRING,
      nama_penumpang: DataTypes.STRING,
      id_pembelian: DataTypes.INTEGER,
      id_kursi: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Penumpang",
    }
  );
  return Penumpang;
};