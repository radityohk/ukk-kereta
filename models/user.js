"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Pembelian_tiket, { foreignKey: "id_user", as: "pembelian_tikets" });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.ENUM("admin", "penumpang")
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};