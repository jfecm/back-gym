const User = require("../models/user");
const bcrypt = require("bcrypt");
const memberCtrl = {};

memberCtrl.getRoutines = async (req, res) => {
    const { id } = req.params;

    const member = await User.findOne({ _id: id, rol: 'member' }).populate('routines');

    if (!member) {
        return res.status(404).json({
            success: false,
            message: 'Member not found or user is not a member.',
        });
    }

    const routines = member.routines;

    res.json({
        success: true,
        routines: routines,
    });

};

memberCtrl.update = async (req, res) => {
    const { id } = req.params;
    const { username, password, firstName, lastName, contactNo, email } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        if (username) {
            const existingUser = await User.findOne({ username });

            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "Username already exists. Please choose a different username.",
                });
            }

            user.username = username;
        }

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        if (firstName) user.firstName = firstName;
        if (lastName) user.lastName = lastName;
        if (contactNo) user.contactNo = contactNo;

        if (email) {
            const existingUserByEmail = await User.findOne({ email });

            if (existingUserByEmail) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists. Please use a different email address.",
                });
            }

            user.email = email;
        }

        await user.save();

        res.json({
            success: true,
            message: 'User updated successfully.',
            user: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};

module.exports = memberCtrl;