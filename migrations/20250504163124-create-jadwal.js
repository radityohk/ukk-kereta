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
      asal_keberangkatan: {
        type: Sequelize.STRING
      },
      tujuan_keberangkatan: {
        type: Sequelize.STRING
      },
      tanggal_berangkat: {
        type: Sequelize.DATE
      },
      tanggal_kedatangan: {
        type: Sequelize.DATE
      },
      harga: {
        type: Sequelize.DOUBLE
      },
      id_kereta: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Keretas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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