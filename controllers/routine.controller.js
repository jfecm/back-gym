const routineCtrl = {};
const Routine = require("../models/routine");
const Exercise = require("../models/exercise");
const User = require("../models/user");

routineCtrl.createCustom = async (req, res) => {
    try {
        const { idu } = req.params;
        const { name, description, exercises } = req.body;

        const user = await User.findById(idu);
        if (!user || user.rol !== 'member') {
            return res.status(404).json({
                success: false,
                message: 'User not found or user is not a member.',
            });
        }

        const validExercises = await Exercise.find({ _id: { $in: exercises } });
        if (validExercises.length !== exercises.length) {
            return res.status(400).json({
                success: false,
                message: 'One or more exercises provided do not exist.',
            });
        }

        const customRoutine = new Routine({
            name,
            description,
            exercises: validExercises,
        });

        await customRoutine.save();

        user.routines.push(customRoutine);

        await user.save();

        res.json({
            success: true,
            message: 'Custom routine created and associated with the user successfully.',
            routine: customRoutine,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};

routineCtrl.createGeneric = async (req, res) => {
    try {
        const { idu, idr } = req.params;

        const user = await User.findById(idu);
        if (!user || user.rol !== 'member') {
            return res.status(404).json({
                success: false,
                message: 'User not found or user is not a member.',
            });
        }

        const routine = await Routine.findById(idr);
        if (!routine) {
            return res.status(404).json({
                success: false,
                message: 'Routine not found.',
            });
        }

        user.routines.push(routine);

        await user.save();

        res.json({
            success: true,
            message: 'Custom routine created successfully.',
            routine: routine,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
}

routineCtrl.create = async (req, res) => {
    try {
        const { name, description, exercises } = req.body;

        const validExercises = await Exercise.find({ _id: { $in: exercises } });

        if (validExercises.length !== exercises.length) {
            return res.status(400).json({
                success: false,
                message: 'One or more exercises provided do not exist.',
            });
        }

        const routine = new Routine({
            name,
            description,
            exercises: validExercises,
        });

        await routine.save();

        res.json({
            success: true,
            message: 'Routine created successfully.',
            routine: routine,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};

routineCtrl.get = async (req, res) => {
    const { id } = req.params;

    try {
        const routine = await Routine.findById(id);

        if (!routine) {
            return res.status(404).json({
                success: false,
                message: 'Routine not found.',
            });
        }

        res.json({
            success: true,
            routine: routine,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};

routineCtrl.getAll = async (req, res) => {
    try {
        const routines = await Routine.find();

        res.json({
            success: true,
            routines: routines,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};

routineCtrl.update = async (req, res) => {
    const { id } = req.params;
    const { name, description, exercises } = req.body;

    try {
        const routine = await Routine.findByIdAndUpdate(
            id,
            { name, description, exercises },
            { new: true }
        );

        if (!routine) {
            return res.status(404).json({
                success: false,
                message: 'Routine not found.',
            });
        }

        res.json({
            success: true,
            message: 'Routine updated successfully.',
            routine: routine,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};

routineCtrl.delete = async (req, res) => {
    const { id } = req.params;

    try {
        const routine = await Routine.findByIdAndDelete(id);

        if (!routine) {
            return res.status(404).json({
                success: false,
                message: 'Routine not found.',
            });
        }

        res.json({
            success: true,
            message: 'Routine deleted successfully.',
            routine: routine
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};

module.exports = routineCtrl;