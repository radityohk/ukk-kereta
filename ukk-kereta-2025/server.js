// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');

// Import routes
const authRoutes       = require('./routes/auth.routes');
const keretaRoutes     = require('./routes/kereta.routes');
const gerbongRoutes    = require('./routes/gerbong.routes');
const kursiRoutes      = require('./routes/kursi.routes');
const jadwalRoutes     = require('./routes/jadwal.routes');
const pemesananRoutes  = require('./routes/pemesanan.routes');
const petugasRoutes    = require('./routes/petugas.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check
app.get('/', (req, res) => {
  res.send('🚆 Sistem Pemesanan Tiket Kereta API is up and running!');
});

// Mounting API routes
app.use('/auth',        authRoutes);
app.use('/kereta',      keretaRoutes);
app.use('/gerbong',     gerbongRoutes);
app.use('/kursi',       kursiRoutes);
app.use('/jadwal',      jadwalRoutes);
app.use('/pemesanan',   pemesananRoutes);
app.use('/petugas',     petugasRoutes);

// Sync DB & start server
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Gagal sinkronisasi database:', err);
  });
