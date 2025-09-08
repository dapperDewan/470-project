import { Router } from "express";
import User from "../model/User.js";
import Player from "../model/Player.js";
import Team from "../model/Team.js";

const router = Router();

// Get all users (admin only)
// Middleware to check admin (for demo: expects ?admin=true, replace with real auth in production)
function requireAdmin(req, res, next) {
  // In production, use JWT or session to check admin status
  // For demo, allow if query param admin=true
  if (req.query.admin === 'true') return next();
  res.status(403).json({ message: 'Admin access required' });
}

// List users
router.get("/admin/users", requireAdmin, async (req, res) => {
  try {
    const users = await User.find({}, "_id username isAdmin");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete user
router.delete("/admin/users/:id", requireAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete player
router.delete("/admin/players/:id", requireAdmin, async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json({ message: "Player deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete team
router.delete("/admin/teams/:id", requireAdmin, async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json({ message: "Team deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
