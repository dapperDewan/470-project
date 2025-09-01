import Match from '../model/Match.js';

export const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find().sort({ date: 1 });
    res.json(matches);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch matches.' });
  }
};

export const createMatch = async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.status(201).json(match);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create match.' });
  }
};
