const { Pemesanan, Penumpang, Jadwal, Kursi } = require("../models");
const { Op } = require("sequelize");

exports.create = async (req, res) => {
  try {
    const { jadwalId, penumpangs } = req.body;
    const jadwal = await Jadwal.findByPk(jadwalId);
    if (!jadwal || jadwal.kuota < penumpangs.length)
      return res.status(400).json({ error: "Kuota tidak cukup" });

    const pem = await Pemesanan.create({
      userId: req.user.id, jadwalId, tanggal: new Date(),
      total: penumpangs.reduce((sum,p)=>sum+p.harga,0)
    });

    for (let p of penumpangs) {
      await Penumpang.create({
        pemesananId: pem.id,
        nama: p.nama,
        no_identitas: p.no_identitas,
        kursiId: p.kursiId,
        harga: p.harga
      });
    }
    res.status(201).json({ message: "Pemesanan sukses", pemesanan: pem });
  } catch(e){ res.status(500).json({error:e.message}); }
};

//  Pelanggan point 5: histori pertanggal/perbulan
exports.historiUser = async (req, res) => {
  const { tanggal, bulan } = req.query;
  let where = { userId: req.user.id };
  if (tanggal) where.tanggal = tanggal;
  if (bulan) where.tanggal = { [Op.like]: tarih => tarih.substring(0,7) === bulan };
  const data = await Pemesanan.findAll({ where, include: Penumpang });
  res.json(data);
};

//  Pelanggan point 6: cetak nota
exports.nota = async (req, res) => {
  const pem = await Pemesanan.findByPk(req.params.id, { include: [Penumpang, Jadwal] });
  if (!pem || pem.userId !== req.user.id)
    return res.sendStatus(404);
  // Untuk demo, kirim JSON sebagai "nota"
  res.json({ nota: pem });
};
