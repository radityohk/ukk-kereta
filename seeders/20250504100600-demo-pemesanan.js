'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Pembelian_tikets', [
      {
        tanggal_pembelian: new Date(),
        id_penumpang: 2,
        id_jadwal: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pembelian_tikets', null, {});
  }
};