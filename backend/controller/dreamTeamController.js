// Admin: Delete any user's dream team
export const deleteDreamTeamByUser = async (req, res) => {
  try {
    if (!req.user?.isAdmin) {
      return res.status(403).json({ error: 'Admin access required.' });
    }
    const result = await DreamTeam.deleteOne({ user: req.params.userId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Dream team not found.' });
    }
    res.json({ message: 'Dream team deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete dream team.' });
  }
};
import DreamTeam from '../model/DreamTeam.js';
import User from '../model/User.js';

// Get current user's dream team
export const getMyDreamTeam = async (req, res) => {
  try {
    const dreamTeam = await DreamTeam.findOne({ user: req.user._id }).populate('players');
    res.json(dreamTeam || { players: [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dream team.' });
  }
};

// Update current user's dream team
export const updateMyDreamTeam = async (req, res) => {
  try {
    const players = req.body.players || [];
    let name;
    if (typeof req.body.name === 'string') {
      name = req.body.name;
    }
    if (players.length > 5) {
      return res.status(400).json({ error: 'You can only add up to 5 players in your dream team.' });
    }
    let dreamTeam = await DreamTeam.findOne({ user: req.user._id });
    if (!dreamTeam) {
      dreamTeam = new DreamTeam({ user: req.user._id, players, name: name || 'My Dream Team' });
    } else {
      dreamTeam.players = players;
      if (typeof name === 'string') {
        dreamTeam.name = name;
      }
    }
    await dreamTeam.save();
    res.json(dreamTeam);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update dream team.' });
  }
};

// Get another user's dream team by userId
export const getDreamTeamByUser = async (req, res) => {
  try {
    const dreamTeam = await DreamTeam.findOne({ user: req.params.userId }).populate('players');
    res.json(dreamTeam || { players: [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dream team.' });
  }
};

// Get another user's dream team by username
export const getDreamTeamByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const dreamTeam = await DreamTeam.findOne({ user: user._id }).populate('players');
    res.json(dreamTeam || { players: [] });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dream team.' });
  }
};
