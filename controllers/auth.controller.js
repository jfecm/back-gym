const jwt = require('jsonwebtoken');
const authCtrl = {};
const User = require("../models/user");
const bcrypt = require("bcrypt");

authCtrl.verifyToken = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            success: false,
            message: "Authorization header is missing.",
        });
    }

    const split = req.headers.authorization.split(' ');
    let token;

    if (split.length >= 2) {
        token = split[1];
    } else {
        return res.status(401).json({
            success: false,
            message: "Invalid authorization format.",
        });
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Token is missing in authorization header.",
        });
    }

    try {
        const payload = jwt.verify(token, "secretkey");
        req.userId = payload._id;
        req.userRol = payload.rol;
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
};

authCtrl.signIn = async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await User.findOne({username});

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Authentication failed. User not found.",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Authentication failed. Incorrect password.",
            });
        }

        const token = jwt.sign({id: user._id, rol: user.rol}, "secretkey");

        res.json({
            success: true,
            message: "Authentication successful.",
            user: user, token: token
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message,
        });
    }

}

authCtrl.signUp = async (req, res) => {
    const {username, password, rol} = req.body;

    try {
        const existingUser = await User.findOne({username});

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Username already exists. Please choose a different username.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            password: hashedPassword,
            rol: rol || 'user',
        });

        await user.save();

        res.json({
            success: true,
            message: "User registered successfully.",
            user: user,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message,
        });
    }
}

module.exports = authCtrl;