'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const kursis = [];
    for (let i = 1; i <= 20; i++) {
      kursis.push({ no_kursi: `A${i}`, id_gerbong: 1, createdAt: new Date(), updatedAt: new Date() });
    }
    await queryInterface.bulkInsert('Kursis', kursis, {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Kursis', null, {});
  }
};