'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Keretas', [
      { nama_kereta: 'Argo Bromo', deskripsi: 'Eksekutif Jakarta-Surabaya', kelas: 'Eksekutif', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Keretas', null, {});
  }
};