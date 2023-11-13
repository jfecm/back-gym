const User = require("../models/user");
const Plan = require("../models/plan");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const userCtrl = {};

userCtrl.create = async (req, res) => {
    try {
        const {
            username, password,
            firstName, lastName,
            contactNo, email
        } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Username already exists. Please choose a different username.",
            });
        }

        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already exists. Please use a different email address.",
            });
        }

        const user = new User({
            username,
            password: await bcrypt.hash(password, 10),
            firstName,
            lastName,
            contactNo,
            email,
            rol: 'user'
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
};

userCtrl.createAdmin = async (req, res) => {
    try {
        const {
            username, password,
            firstName, lastName,
            contactNo, email
        } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Username already exists. Please choose a different username.",
            });
        }

        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already exists. Please use a different email address.",
            });
        }

        const user = new User({
            username,
            password: await bcrypt.hash(password, 10),
            firstName,
            lastName,
            dateJoin: new Date(),
            contactNo,
            email,
            rol: 'admin'
        });

        await user.save();

        res.json({
            success: true,
            message: "Admin registered successfully.",
            user: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message,
        });
    }
};

userCtrl.associateUserWithPlan = async (req, res) => {
    try {
        const { u } = req.query;
        const { p } = req.query;

        const user = await User.findById(u);

        const plan = await Plan.findById(p);

        if (!user || !plan) {
            return res.status(404).json({
                success: false,
                message: 'User or plan not found.',
            });
        }

        user.plan = p;
        user.dateJoin = new Date();
        user.rol = 'member';

        await user.save();

        res.json({
            success: true,
            message: 'User associated with the plan successfully.',
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

userCtrl.createMember = async (req, res) => {
    try {
        const { username, password, firstName, lastName, email, contactNo } = req.body;
        const { id } = req.params;

        const existingPlan = await Plan.findOne({ _id: id, status: 'A' });

        if (!existingPlan) {
            return res.status(400).json({
                success: false,
                message: 'Invalid plan ID or plan is not active.',
            });
        }

        const member = new User({
            username,
            password: await bcrypt.hash(password, 10),
            firstName,
            lastName,
            email,
            contactNo,
            dateJoin: new Date(),
            rol: 'member',
            plan: existingPlan._id,
        });

        await member.save();

        res.json({
            success: true,
            message: 'Member created successfully.',
            member: member,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};

userCtrl.createCoach = async (req, res) => {
    try {
        const { username, password, firstName, lastName, contactNo, email } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Username already exists. Please choose a different username.',
            });
        }

        const coach = new User({
            username,
            password: await bcrypt.hash(password, 10),
            firstName,
            lastName,
            contactNo,
            email,
            dateJoin: new Date(),
            rol: 'coach',
        });

        await coach.save();

        res.json({
            success: true,
            message: 'Coach created successfully.',
            coach: coach,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};

userCtrl.update = async (req, res) => {
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

userCtrl.updatePassword = async (req, res) => {
    const { id } = req.params;
    const { new_password } = req.query;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        user.password = await bcrypt.hash(new_password, 10);

        await user.save();

        res.json({
            success: true,
            message: 'Password updated successfully.',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};

userCtrl.get = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id).populate('routines'); ;

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        res.json({
            success: true,
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

userCtrl.getAll = async (req, res) => {

    try {
        let { rol } = req.query;

        const validRoles = ['user', 'admin', 'member', 'coach'];

        if (!rol || !validRoles.includes(rol)) {
            rol = 'user';
        }

        const users = await User.find({ rol });

        res.json({
            success: true,
            users: users,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};

userCtrl.sendCredentials = async (req, res) => {
    console.log(req.params)
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.AUTH_MAIL_USER,
                pass: process.env.AUTH_MAIL_PASSWORD,
            },
        });

        const body = generateBodyAccessCredentials(user);
        await transporter.sendMail(body);

        res.json({
            success: true,
            message: 'Access credentials sent.',
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};

userCtrl.delete = async (req, res) => {
    try {
        const { id } = req.params;

        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        await User.findByIdAndDelete(id);

        res.json({
            success: true,
            message: 'User deleted successfully.',
            deletedUser: existingUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};


const generateBodyAccessCredentials = (user) => {
    const html = `
    <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #333;
      font-size: 30px;
      margin-bottom: 20px;
      text-align: center;
    }
    p {
      color: #555;
      font-size: 18px;
      line-height: 1.5;
    }
    .highlight {
      color: #ff6f00;
      font-weight: bold;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #ff6f00;
      color: #fff;
      text-decoration: none;
      border-radius: 4px;
      font-size: 16px;
      transition: background-color 0.3s;
    }
    .button:hover {
      background-color: #ff8f00;
    }
  </style>

   <div class="container">
     <h1>Welcome to our gym</h1>
     <p>Hi <span class="highlight">${user.firstName}, ${user.lastName}</span>!</p>
     <p>Your account has been created successfully. Next, we provide you with your access credentials:</p>
     <p><strong>Username:</strong> ${user.username}</p>
     <p><strong>Password:</strong> ${user.password}</p>
     <p>Please keep this information safe.</p>
     <p>We are waiting for you in our gym, so you can start training and achieve your goals.</p>
     <p>See you soon!</p>
     <p style="text-align: center;">
       <a href="http://localhost:4200/" target="_blank" class="button">Go to login</a>
     </p>
   </div>
  `;

    return ({
        from: process.env.AUTH_MAIL_USER,
        to: user.email,
        subject: "Welcome!",
        text: "Hello! We welcome you.",
        html: html,
    });
};

module.exports = userCtrl;