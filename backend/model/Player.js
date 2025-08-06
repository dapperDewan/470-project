import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    height: String,
    weight: String,
    age: Number,
    stats: {
        pointsPerGame: Number,
        assistsPerGame: Number,
        reboundsPerGame: Number
    },
    image: String
});

export default mongoose.model('Player', playerSchema);
