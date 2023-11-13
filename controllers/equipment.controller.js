const equipmentCtrl = {};
const Equipment = require('../models/equipment');
const Plan = require("../models/plan");

equipmentCtrl.create = async (req, res) => {
    try {
        const {name, total, image} = req.body;

        const existingNameEquipment = await Equipment.findOne({ name });
        if (existingNameEquipment) {
            return res.status(400).json({
                success: false,
                message: "Name equipment already exists. Please choose a different name.",
            });
        }

        const newEquipment = new Equipment({
            name,
            total,
            status: 'active',
            image,
        });

        await newEquipment.save();

        res.json({
            success: true,
            message: 'Equipment created successfully.',
            equipment: newEquipment,
        });
    } catch (error) {
        res.status(500).json({
            success: false, message: 'Internal server error.', error: error.message,
        });
    }
};

equipmentCtrl.get = async (req, res) => {
    try {
        const { id } = req.params;
        const equipment = await Equipment.findById(id);

        if (!equipment) {
            return res.status(404).json({
                success: false,
                message: 'Equipment not found.',
            });
        }

        res.json({
            success: true,
            equipment: equipment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};

equipmentCtrl.getAll = async (req, res) => {
    try {
        const equipmentList = await Equipment.find();

        res.json({
            success: true,
            equipment: equipmentList,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};

equipmentCtrl.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, total, image } = req.body;

        const existingNameEquipment = await Equipment.findOne({ name });
        if (existingNameEquipment) {
            return res.status(400).json({
                success: false,
                message: "Name equipment already exists. Please choose a different name.",
            });
        }

        const updatedEquipment = await Equipment.findByIdAndUpdate(
            id,
            { name, total, image },
            { new: true }
        );

        if (!updatedEquipment) {
            return res.status(404).json({
                success: false,
                message: 'Equipment not found.',
            });
        }

        res.json({
            success: true,
            message: 'Equipment updated successfully.',
            equipment: updatedEquipment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};

equipmentCtrl.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEquipment = await Equipment.findByIdAndDelete(id);

        if (!deletedEquipment) {
            return res.status(404).json({
                success: false,
                message: 'Equipment not found.',
            });
        }

        res.json({
            success: true,
            message: 'Equipment deleted successfully.',
            equipment: deletedEquipment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};

module.exports = equipmentCtrl;