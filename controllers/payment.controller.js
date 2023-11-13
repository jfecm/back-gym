const paymentCtrl = {};
const Payment = require("../models/payment");
const User = require("../models/user");
const Plan = require("../models/plan");

paymentCtrl.create = async (req, res) => {
    try {
        const {member, plan} = req.body;

        const existingMember = await User.findById(member);

        if (!existingMember || existingMember.rol !== 'member') {
            return res.status(400).json({
                success: false,
                message: "Invalid member ID or member does not have the 'member' role.",
            });
        }

        const existingPlan = await Plan.findOne({_id: plan, status: 'A'});

        if (!existingPlan) {
            return res.status(400).json({
                success: false,
                message: "Invalid plan ID or plan is not active.",
            });
        }

        const payment = new Payment({
            member,
            plan,
            status: 'pending',
            datePaid: new Date(),
        });

        await payment.save();

        const populatedPayment = await Payment.findById(payment._id)
            .populate('member', 'username rol')
            .populate('plan', 'name validity amount');

        res.json({
            success: true,
            message: 'Payment created successfully.',
            payment: populatedPayment,
        });
    } catch (error) {
        res.status(500).json({
            success: false, message: 'Internal server error.', error: error.message,
        });
    }
};

paymentCtrl.get = async (req, res) => {
    try {
        const { id } = req.params;

        const payment = await Payment.findById(id);

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found.',
            });
        }

        res.json({
            success: true,
            payment: payment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};

paymentCtrl.getAll = async (req, res) => {
    try {
        const payments = await Payment.find();

        res.json({
            success: true,
            payments: payments,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};

paymentCtrl.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { s } = req.query;

        const paymentStatus = ['pending', 'paid', 'failed', 'refunded'];

        if (!paymentStatus.includes(s)) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment status provided.",
            });
        }

        const payment = await Payment.findByIdAndUpdate(id, { status: s });

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found.',
            });
        }

        res.json({
            success: true,
            message: 'Payment updated successfully.',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
}

paymentCtrl.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const payment = await Payment.findByIdAndDelete(id);

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: 'Payment not found.',
            });
        }

        res.json({
            success: true,
            message: 'Payment deleted successfully.',
            payment: payment,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error.',
            error: error.message,
        });
    }
};
module.exports = paymentCtrl;