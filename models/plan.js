const mongoose = require('mongoose')
const {Schema} = mongoose;
// A=active I=inactive
const planStatus = ['A', 'I'];
// 7, 1, 3, 6, 12 (days)
const validDurations = [7, 1, 3, 6, 12];

const PlanSchema = new Schema({
    name:        {type: String, required: true},
    validity:    {type: String, enum: validDurations, required: true},
    amount:      {type: Number, required: true},
    description: {type: String, required: false},
    image:       {type: String, required: false},
    status:      {type: String, enum: planStatus, default: 'A', required: false}
});

module.exports = mongoose.models.Plan || mongoose.model('Plan', PlanSchema);