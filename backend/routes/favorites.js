import express from 'express';
import User from '../model/User.js';
import Player from '../model/Player.js';
import Team from '../model/Team.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get current user's favorite players
router.get('/players', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');
    console.log('Favorites players for user', req.user._id, user.favorites);
    res.json(user.favorites || []);
  } catch (err) {
    console.error('Error fetching favorite players:', err);
    res.status(500).json({ error: 'Failed to fetch favorite players.' });
  }
});

// Update current user's favorite players
router.put('/players', auth, async (req, res) => {
  try {
    const favorites = req.body.favorites || [];
    const user = await User.findById(req.user._id);
    user.favorites = favorites;
    await user.save();
    console.log('Updated favorites for user', req.user._id, user.favorites);
    res.json(user.favorites);
  } catch (err) {
    console.error('Error updating favorite players:', err);
    res.status(500).json({ error: 'Failed to update favorite players.' });
  }
});

// Get current user's favorite teams
router.get('/teams', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favoriteTeams');
    console.log('Favorite teams for user', req.user._id, user.favoriteTeams);
    res.json(user.favoriteTeams || []);
  } catch (err) {
    console.error('Error fetching favorite teams:', err);
    res.status(500).json({ error: 'Failed to fetch favorite teams.' });
  }
});

// Update current user's favorite teams
router.put('/teams', auth, async (req, res) => {
  try {
    const favoriteTeams = req.body.favoriteTeams || [];
    const user = await User.findById(req.user._id);
    user.favoriteTeams = favoriteTeams;
    await user.save();
    res.json(user.favoriteTeams);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update favorite teams.' });
  }
});

export default router;
