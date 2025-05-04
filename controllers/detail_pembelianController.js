const { Detail_pembelian } = require('../models');

exports.getAll = async (req, res) => {
    try {
        const data = await Detail_pembelian.findAll();
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
        const newData = await Detail_pembelian.create(data);
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
        const updated = await Detail_pembelian.update(data, { where: { id: req.params.id } });
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
        await Detail_pembelian.destroy({ where: { id: req.params.id } });
        res.json({ 
            message: 'Data deleted successfully' 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
