const mongoose = require('mongoose');
const {Schema} = mongoose;

const ExerciseSchema = new Schema({
    name:        { type: String, required: true },
    description: { type: String, required: false },
    category:    { type: String, required: false },
    videoUrl:    { type: String, required: false },
    repetitions: { type: Number, required: true }
});

module.exports = mongoose.models.Exercise || mongoose.model('Exercise', ExerciseSchema);