import { Router } from "express";
import User from "../model/User.js";

const router = Router();

// Get all users (admin only)
// Middleware to check admin (for demo: expects ?admin=true, replace with real auth in production)
function requireAdmin(req, res, next) {
  // In production, use JWT or session to check admin status
  // For demo, allow if query param admin=true
  if (req.query.admin === 'true') return next();
  res.status(403).json({ message: 'Admin access required' });
}

router.get("/admin/users", requireAdmin, async (req, res) => {
  try {
    const users = await User.find({}, "_id username isAdmin");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
