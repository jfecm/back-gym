const mongoose = require("mongoose");
const UserSchema = require("./user");
const PlanSchema = require("./plan");
const {Schema} = mongoose;
const paymentStatus = ['pending', 'paid', 'failed', 'refunded'];

const PaymentSchema = new Schema({
    member:   {type: Schema.Types.ObjectId, ref: UserSchema, required: true},
    plan:     {type: Schema.Types.ObjectId, ref: PlanSchema, required: true},
    status:   {type: String, enum: paymentStatus, default: 'pending', required: false},
    datePaid: {type: Date,   required: false},
});

module.exports = mongoose.model('Payment', PaymentSchema);