const express = require('express');
const controller = require('../controllers/pembelian_tiketController');
const router = express.Router();

router.get('/', controller.getAll);
router.get('/histori-tiket-petugas', controller.historiTiketAll)
router.get('/histori-tiket-penumpang', controller.historiTiketPenumpang)
router.get('/rekap-pemasukan', controller.rekapPemasukan)
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
