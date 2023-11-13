const mongoose = require('mongoose');
const {Schema} = mongoose;

const RoutineSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: false},
    exercises:   [{type: Schema.Types.ObjectId, ref: 'Exercise', required: true}],
});

module.exports = mongoose.models.Routine || mongoose.model('Routine', RoutineSchema);