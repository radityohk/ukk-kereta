'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Detail_pembelians', [
      {
        NIK: '1234567890123456',
        nama_penumpang: 'Budi Santoso',
        id_pembelian: '2',
        id_kursi: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Detail_pembelians', null, {});
  }
};