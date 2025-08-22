import { Router } from "express";
import Player from "../model/Player.js";
import Team from "../model/Team.js";

const router = Router();

// Get players by array of IDs (for favorites/dream team)
router.post("/players/byIds", async (req, res) => {
  try {
    const players = await Player.find({ _id: { $in: req.body.ids } });
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get teams by array of IDs (for favorites)
router.post("/teams/byIds", async (req, res) => {
  try {
    const teams = await Team.find({ _id: { $in: req.body.ids } });
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
