"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pembelian_tiket extends Model {
    static associate(models) {
      Pembelian_tiket.belongsTo(models.Penumpang, { foreignKey: "id_penumpang", as: "penumpang" });
      Pembelian_tiket.belongsTo(models.Jadwal, { foreignKey: "id_jadwal", as: "jadwal" });
      Pembelian_tiket.hasMany(models.Penumpang, { foreignKey: "id_pembelian", as: "pembelian" });
    }
  }
  Pembelian_tiket.init(
    {
      tanggal_pembelian: DataTypes.DATE,
      id_penumpang: DataTypes.INTEGER,
      id_jadwal: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Pembelian_tiket",
    }
  );
  return Pembelian_tiket;
};