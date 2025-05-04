'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jadwals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      keretaId: {
        type: Sequelize.INTEGER
      },
      asal: {
        type: Sequelize.STRING
      },
      tujuan: {
        type: Sequelize.STRING
      },
      tanggal: {
        type: Sequelize.DATE
      },
      jam: {
        type: Sequelize.STRING
      },
      harga: {
        type: Sequelize.INTEGER
      },
      kuota: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Jadwals');
  }
};