const exerciseCtrl = {};
const Exercise = require('../models/exercise');

exerciseCtrl.create = async (req, res) => {
    try {
        const { name, description, category, videoUrl, repetitions } = req.body;

        const existingExercise = await Exercise.findOne({ name });
        if (existingExercise) {
            return res.status(400).json({
                success: false,
                message: "Exercise name already exists. Please choose a different name.",
            });
        }

        const exercise = new Exercise({
            name,
            description,
            category,
            videoUrl,
            repetitions
        });

        await exercise.save();

        res.json({
            success: true,
            message: 'Exercise created successfully.',
            exercise: exercise,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};

exerciseCtrl.get = async (req, res) => {
    try {
        const { id } = req.params;
        const exercise = await Exercise.findById(id);

        if (!exercise) {
            return res.status(404).json({
                success: false,
                message: 'Exercise not found.',
            });
        }

        res.json({
            success: true,
            exercise: exercise,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};

exerciseCtrl.getAll = async (req, res) => {
    try {
        const exercises = await Exercise.find();

        res.json({
            success: true,
            exercises: exercises,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};

exerciseCtrl.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category, videoUrl, repetitions } = req.body;

        const existingExercise = await Exercise.findOne({ name });
        if (existingExercise) {
            return res.status(400).json({
                success: false,
                message: "Exercise name already exists. Please choose a different name.",
            });
        }

        const updatedExercise = await Exercise.findByIdAndUpdate(
            id,
            { name, description, category, videoUrl, repetitions },
            { new: true }
        );

        if (!updatedExercise) {
            return res.status(404).json({
                success: false,
                message: 'Exercise not found.',
            });
        }

        res.json({
            success: true,
            message: 'Exercise updated successfully.',
            exercise: updatedExercise,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};

exerciseCtrl.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExercise = await Exercise.findByIdAndDelete(id);

        if (!deletedExercise) {
            return res.status(404).json({
                success: false,
                message: 'Exercise not found.',
            });
        }

        res.json({
            success: true,
            message: 'Exercise deleted successfully.',
            exercise: deletedExercise,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};

module.exports = exerciseCtrl;