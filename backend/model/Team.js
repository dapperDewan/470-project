import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    conference: {
        type: String,
        required: true
    },
    division: {
        type: String,
        required: true
    },
    logo: String,
    roster: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }],
    championships: Number,
    establishedYear: Number
});

export default mongoose.model('Team', teamSchema);
