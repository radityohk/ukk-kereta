'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      { username: 'admin', password: 'hashedadminpass', role: 'admin', createdAt: new Date(), updatedAt: new Date() },
      { username: 'user1', password: 'hasheduser1pass', role: 'penumpang', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};