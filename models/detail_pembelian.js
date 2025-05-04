'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detail_pembelian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Detail_pembelian.init({
    NIK: DataTypes.STRING,
    nama_penumpang: DataTypes.STRING,
    id_pembelian: DataTypes.INTEGER,
    id_kursi: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Detail_pembelian',
  });
  return Detail_pembelian;
};