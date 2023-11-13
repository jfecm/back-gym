const Plan = require("../models/plan");
const planCtrl = {};

planCtrl.create = async (req, res) => {
  try {
    const { name, validity, amount, description, image } = req.body;

    const existingNamePlan = await Plan.findOne({ name });
    if (existingNamePlan) {
      return res.status(400).json({
        success: false,
        message: "Name plan already exists. Please choose a different name.",
      });
    }

    const validDurations = [7, 1, 3, 6, 12];

    if (!validDurations.includes(validity)) {
      return res.status(400).json({
        success: false,
        message: "Invalid plan validity. Please choose a valid duration.",
      });
    }

    const plan = new Plan({
      name,
      validity,
      amount,
      description,
      image,
      status: 'A'
    });

    await plan.save();

    res.json({
      success: true,
      message: 'Plan created successfully.',
      plan: plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
      error: error.message,
    });
  }
};

planCtrl.get = async (req, res) => {
  const { id } = req.params;

  try {
    const plan = await Plan.findById(id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found.',
      });
    }

    res.json({
      success: true,
      plan: plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
      error: error.message,
    });
  }
};

planCtrl.getAll = async (req, res) => {
  try {
    const { status } = req.query;

    const validPlans = ['A', 'I'];

    if (!validPlans.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid plan status provided.',
      });
    }

    const plans = await Plan.find({ status });

    res.json({
      success: true,
      plans: plans,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
      error: error.message,
    });
  }
};

planCtrl.update = async (req, res) => {
  const { id } = req.params;
  const { name, validity, amount, description, image } = req.body;

  try {
    const plan = await Plan.findById(id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found.',
      });
    }

    const existingNamePlan = await Plan.findOne({ name });
    if (existingNamePlan) {
      return res.status(400).json({
        success: false,
        message: "Name plan already exists. Please choose a different name.",
      });
    }

    plan.name = name || plan.name;
    plan.validity = validity || plan.validity;
    plan.amount = amount || plan.amount;
    plan.description = description || plan.description;
    plan.image = image || plan.image;

    await plan.save();

    res.json({
      success: true,
      message: 'Plan updated successfully.',
      plan: plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
      error: error.message,
    });
  }
};

planCtrl.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const plan = await Plan.findByIdAndDelete(id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found.',
      });
    }

    res.json({
      success: true,
      message: 'Plan deleted successfully.',
      plan: plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
      error: error.message,
    });
  }
};

module.exports = planCtrl;
