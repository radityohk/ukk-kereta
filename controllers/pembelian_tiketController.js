const { Detail_pembelian, Pembelian_tiket, Jadwal, Gerbong, Kereta, sequelize } = require("../models");
const { Op, fn, col } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const data = await Pembelian_tiket.findAll();
    res.json({
      message: "Data retrieved successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id_jadwal, id_penumpang, penumpang } = req.body; // penumpang: array
    console.log(req.body);

    if (!Array.isArray(penumpang) || penumpang.length === 0) {
      return res
        .status(400)
        .json({
          message: "Data penumpang harus berupa array dan tidak boleh kosong",
        });
    }

    // Cek kuota tersedia
    const jadwal = await Jadwal.findByPk(id_jadwal, { transaction: t });
    const kereta = await Kereta.findByPk(jadwal.id_kereta, { transaction: t });
    const gerbong = await Gerbong.findOne({ 
      where: { id_kereta: kereta.id }, 
      transaction: t 
    });

    await gerbong.update(
      { kuota: gerbong.kuota - penumpang.length },
      { transaction: t }
    );

    if (!jadwal) {
      await t.rollback();
      return res.status(404).json({ message: "Jadwal tidak ditemukan" });
    }

    if (jadwal.kuota < penumpang.length) {
      await t.rollback();
      return res.status(400).json({ message: "Kuota tidak mencukupi" });
    }

    // Simpan tiket untuk setiap penumpang
    const tiketList = [];

    for (const p of penumpang) {
      const tiket = await Pembelian_tiket.create(
        {
          id_jadwal,
          id_penumpang,
          tanggal_pembelian: new Date(),
          nama_penumpang: p.nama_penumpang,
          nomor_identitas: p.nomor_identitas,
          // Tambahkan field lain jika perlu
        },
        { transaction: t }
      );

      await Detail_pembelian.create(
        {
          NIK: p.nomor_identitas,
          nama_penumpang: p.nama_penumpang,
          id_pembelian: tiket.id, // id dari tiket yang baru saja dibuat
          id_kursi: p.id_kursi, // jika ada field id_kursi dari input
        },
        { transaction: t }
      );

      tiketList.push(tiket);
    }

    // Update kuota
    await jadwal.update(
      { kuota: jadwal.kuota - penumpang.length },
      { transaction: t }
    );

    await t.commit();

    res.status(201).json({
      message: "Tiket berhasil dipesan",
      data: tiketList,
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({ error: error.message });
  }
};

exports.historiTiketPenumpang = async (req, res) => {
    try {
        const { tanggal, bulan, id_penumpang } = req.body;

        if (!id_penumpang) {
            return res.status(400).json({ message: 'id_penumpang wajib disertakan' });
        }

        let whereClause = { id_penumpang };

        if (tanggal) {
            whereClause.createdAt = {
                [Op.gte]: new Date(`${tanggal}T00:00:00`),
                [Op.lt]: new Date(`${tanggal}T23:59:59`)
            };
        } else if (bulan) {
            const [tahun, bulanAngka] = bulan.split('-');
            const awalBulan = new Date(tahun, bulanAngka - 1, 1);
            const akhirBulan = new Date(tahun, bulanAngka, 1);
            whereClause.createdAt = {
                [Op.gte]: awalBulan,
                [Op.lt]: akhirBulan
            };
        }

        const histori = await Pembelian_tiket.findAll({ where: whereClause });

        res.status(200).json({
            message: 'Histori tiket ditemukan',
            data: histori
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.historiTiketAll = async (req, res) => {
    try {
        const { tanggal, bulan } = req.body;

        let whereClause = {};

        if (tanggal) {
            whereClause.createdAt = {
                [Op.gte]: new Date(`${tanggal}T00:00:00`),
                [Op.lt]: new Date(`${tanggal}T23:59:59`)
            };
        } else if (bulan) {
            const [tahun, bulanAngka] = bulan.split('-');
            const awalBulan = new Date(tahun, bulanAngka - 1, 1);
            const akhirBulan = new Date(tahun, bulanAngka, 1);
            whereClause.createdAt = {
                [Op.gte]: awalBulan,
                [Op.lt]: akhirBulan
            };
        }

        const hasil = await Pembelian_tiket.findAll({ where: whereClause });

        res.status(200).json({
            message: 'Histori transaksi ditemukan',
            data: hasil
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.rekapPemasukan = async (req, res) => {
    try {
        const { bulan } = req.body;

        if (!bulan) {
            return res.status(400).json({ message: 'Parameter bulan (YYYY-MM) wajib disertakan' });
        }

        const [tahun, bulanAngka] = bulan.split('-');
        const awalBulan = new Date(tahun, bulanAngka - 1, 1);
        const akhirBulan = new Date(tahun, bulanAngka, 1);

        // Hitung total pemasukan
        const total = await Pembelian_tiket.sum('harga', {
            where: {
                createdAt: {
                    [Op.gte]: awalBulan,
                    [Op.lt]: akhirBulan
                }
            }
        });

        res.status(200).json({
            message: `Rekap pemasukan bulan ${bulan}`,
            total_pemasukan: total || 0
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
  try {
    let data = req.body;
    const updated = await Pembelian_tiket.update(data, {
      where: { id: req.params.id },
    });
    res.json({
      message: "Data updated successfully",
      updated,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Pembelian_tiket.destroy({ where: { id: req.params.id } });
    res.json({
      message: "Data deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
