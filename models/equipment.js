const mongoose = require("mongoose");
const {Schema} = mongoose;
const equipmentStatus = ['active', 'inactive'];

const EquipmentSchema = new Schema({
    name:   {type: String, required: true},
    total:  {type: Number, required: true},
    status: {type: String, enum: equipmentStatus, required: true},
    image:  {type: String, required: false}
});

module.exports = mongoose.model('Equipment', EquipmentSchema);