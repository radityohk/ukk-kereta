const express = require('express');
const controller = require('../controllers/detail_pembelianController');
const router = express.Router();

router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
