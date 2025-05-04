'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Gerbongs', [
      { nama_gerbong: 'Gerbong 1', kuota: 20, id_kereta: 1, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Gerbongs', null, {});
  }
};