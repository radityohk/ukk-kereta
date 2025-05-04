'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Penumpangs', [
      {
        NIK: '1234567890123456',
        nama_penumpang: 'Budi Santoso',
        alamat: 'Jl. Konak Jahat',
        telp: '07588918748',
        id_user: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        NIK: '2345678901234567',
        nama_penumpang: 'Siti Aminah',
        alamat: 'Jl. Konak Jahat',
        telp: '07588918748',
        id_user: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Penumpangs', null, {});
  }
};