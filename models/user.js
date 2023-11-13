const mongoose = require("mongoose");
const PlanSchema = require("./plan");
const {Schema} = mongoose;
const rolesEnum = ['user', 'admin', 'member', 'coach'];

const UserSchema = new Schema({
    username:       {type: String, required: true},
    password:       {type: String, required: true},
    userImage:      {type: String, required: false},
    firstName:      {type: String, required: false},
    lastName:       {type: String, required: false},
    dateJoin:       {type: Date,   required: false},
    dateExpiration: {type: Date,   required: false},
    contactNo:      {type: String, required: false},
    email:          {type: String, required: false},
    rol:            {type: String, required: false, enum: rolesEnum },
    plan:           {type: Schema.Types.ObjectId, ref: PlanSchema, required: false},
    routines:       [{ type: Schema.Types.ObjectId, ref: 'Routine' }],
});

module.exports = mongoose.model('User', UserSchema);