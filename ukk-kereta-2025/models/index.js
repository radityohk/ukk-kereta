'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require(__dirname + '/../config/config.json').development;
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname)
  .filter(file => file !== basename && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Relasi
db.User.hasMany(db.Pemesanan, { foreignKey: 'userId' });
db.Pemesanan.belongsTo(db.User, { foreignKey: 'userId' });

db.Kereta.hasMany(db.Gerbong, { foreignKey: 'keretaId' });
db.Gerbong.belongsTo(db.Kereta, { foreignKey: 'keretaId' });

db.Gerbong.hasMany(db.Kursi, { foreignKey: 'gerbongId' });
db.Kursi.belongsTo(db.Gerbong, { foreignKey: 'gerbongId' });

db.Kereta.hasMany(db.Jadwal, { foreignKey: 'keretaId' });
db.Jadwal.belongsTo(db.Kereta, { foreignKey: 'keretaId' });

db.Jadwal.hasMany(db.Pemesanan, { foreignKey: 'jadwalId' });
db.Pemesanan.belongsTo(db.Jadwal, { foreignKey: 'jadwalId' });

db.Pemesanan.hasMany(db.Penumpang, { foreignKey: 'pemesananId' });
db.Penumpang.belongsTo(db.Pemesanan, { foreignKey: 'pemesananId' });

db.Kursi.hasMany(db.Penumpang, { foreignKey: 'kursiId' });
db.Penumpang.belongsTo(db.Kursi, { foreignKey: 'kursiId' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
