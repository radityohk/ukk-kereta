#!/bin/bash

# Buat folder jika belum ada
mkdir -p controllers routes

# Buat file controller
cat <<EOL > controllers/userController.js
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.register = async (req, res) => {
    try {
        let data = req.body;
        data.password = md5(data.password);
        const user = await User.create(data);
        res.status(201).json({
            message: 'User registered successfully',
            user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        let data = req.body;
        const user = await User.findOne({ where: { username: data.username } });
        if (!user || user.password !== md5(data.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user.id, role: user.role }, 'secretKey', { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
EOL

# Buat file routes
cat <<EOL > routes/userRoutes.js
const express = require('express');
const { register, login } = require('../controllers/userController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
EOL

# Buat file controller untuk tabel lainnya
for model in petugas detail_pembelian; do
cat <<EOL > controllers/${model}Controller.js
const { ${model^} } = require('../models');

exports.getAll = async (req, res) => {
    try {
        const data = await ${model^}.findAll();
        res.json({ 
            message: 'Data retrieved successfully', 
            data 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = async (req, res) => {
    try {
        let data = req.body;
        const newData = await ${model^}.create(data);
        res.status(201).json({ 
            message: 'Data created successfully', 
            newData 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        let data = req.body;
        const updated = await ${model^}.update(data, { where: { id: req.params.id } });
        res.json({ 
            message: 'Data updated successfully', 
            updated 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await ${model^}.destroy({ where: { id: req.params.id } });
        res.json({ 
            message: 'Data deleted successfully' 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
EOL

done

# Buat file routes untuk tabel lainnya
for model in petugas detail_pembelian; do
cat <<EOL > routes/${model}Routes.js
const express = require('express');
const controller = require('../controllers/${model}Controller');
const router = express.Router();

router.get('/', controller.getAll);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
EOL

done

echo "Controllers and routes created successfully."
