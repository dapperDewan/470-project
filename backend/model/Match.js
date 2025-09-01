import mongoose from 'mongoose';

const MatchSchema = new mongoose.Schema({
  homeTeam: { type: String, required: true },
  awayTeam: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  score: { type: String }, // e.g. '102-98'
  status: { type: String, default: 'upcoming' } // upcoming, finished
});

const Match = mongoose.model('Match', MatchSchema);
export default Match;
