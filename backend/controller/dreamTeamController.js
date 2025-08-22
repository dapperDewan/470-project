const DreamTeam = require('../model/DreamTeam');

// Get current user's dream team
exports.getMyDreamTeam = async (req, res) => {
  try {
    const dreamTeam = await DreamTeam.findOne({ user: req.user._id }).populate('players');
    res.json(dreamTeam || { players: [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dream team.' });
  }
};

// Update current user's dream team
exports.updateMyDreamTeam = async (req, res) => {
  try {
    let dreamTeam = await DreamTeam.findOne({ user: req.user._id });
    if (!dreamTeam) {
      dreamTeam = new DreamTeam({ user: req.user._id, players: req.body.players });
    } else {
      dreamTeam.players = req.body.players;
    }
    await dreamTeam.save();
    res.json(dreamTeam);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update dream team.' });
  }
};

// Get another user's dream team by userId
exports.getDreamTeamByUser = async (req, res) => {
  try {
    const dreamTeam = await DreamTeam.findOne({ user: req.params.userId }).populate('players');
    res.json(dreamTeam || { players: [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dream team.' });
  }
};
