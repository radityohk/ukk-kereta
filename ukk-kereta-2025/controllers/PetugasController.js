const { Pemesanan, Penumpang } = require("../models");
const { Op } = require("sequelize");

exports.historiAll = async (req, res) => {
  const { tanggal, bulan } = req.query;
  let where = {};
  if (tanggal) where.tanggal = tanggal;
  if (bulan) where.tanggal = { [Op.like]: `${bulan}%` };
  const data = await Pemesanan.findAll({ where, include: Penumpang });
  res.json(data);
};

exports.rekapBulanan = async (req, res) => {
  const { bulan } = req.query;
  if (!bulan) return res.status(400).json({ error: "bulan dibutuhkan" });
  const start = `${bulan}-01`, end = `${bulan}-31`;
  const hasil = await Pemesanan.findAll({
    where: { tanggal: { [Op.between]: [start, end] } },
    attributes: [
      [sequelize.fn('month', sequelize.col('tanggal')), 'bulan'],
      [sequelize.fn('sum', sequelize.col('total')), 'pemasukan']
    ],
    group: ['bulan']
  });
  res.json(hasil);
};
