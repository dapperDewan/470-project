const mongoose = require('mongoose');

const DreamTeamSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, default: 'My Dream Team' },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DreamTeam', DreamTeamSchema);
