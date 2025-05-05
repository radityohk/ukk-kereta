// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');

// Import routes
// const authRoutes       = require('./routes/authRoutes');
const userRoutes       = require('./routes/userRoutes');
const keretaRoutes     = require('./routes/keretaRoutes');
const gerbongRoutes    = require('./routes/gerbongRoutes');
const kursiRoutes      = require('./routes/kursiRoutes');
const jadwalRoutes     = require('./routes/jadwalRoutes');
const pembelian_tiketRoutes  = require('./routes/pembelian_tiketRoutes');
const petugasRoutes    = require('./routes/petugasRoutes');
const pelangganRoutes    = require('./routes/pelangganRoutes');
const detail_pembelianRoutes    = require('./routes/detail_pembelianRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check
app.get('/', (req, res) => {
  res.send('Sistem Pemesanan Tiket Kereta API is up and running!');
});

// Mounting API routes
// app.use('/auth',        authRoutes);
app.use('/user',        userRoutes);
app.use('/gerbong',     gerbongRoutes);
app.use('/jadwal',      jadwalRoutes);
app.use('/kereta',      keretaRoutes);
app.use('/kursi',       kursiRoutes);
app.use('/pembelian_tiket',   pembelian_tiketRoutes);
app.use('/petugas',     petugasRoutes);
app.use('/pelanggan',     pelangganRoutes);
app.use('/detail_pembelian',     detail_pembelianRoutes);

// Sync DB & start server
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Gagal sinkronisasi database:', err);
  });
