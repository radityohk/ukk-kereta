const express = require('express');
const { getAll, register, login } = require('../controllers/userController');
const router = express.Router();

router.get('/', getAll);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
