'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Petugas', [
      {
        nama_petugas: 'Ahmad Fauzi',
        alamat: 'Jl. Bagus 20',
        telp: '086581274712',
        id_user: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Petugas', null, {});
  }
};
