'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Jadwals', [
      {
        asal_keberangkatan: 'Jakarta',
        tujuan_keberangkatan: 'Surabaya',
        tanggal_berangkat: new Date('2025-05-10T08:00:00'),
        tanggal_kedatangan: new Date('2025-05-10T18:00:00'),
        harga: 250000,
        id_kereta: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Jadwals', null, {});
  }
};