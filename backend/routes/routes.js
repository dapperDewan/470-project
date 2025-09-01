import merchandiseRoutes from "./merchandise.js";
import { Router } from "express";
import playerController from "../controller/playerController.js";
import teamController from "../controller/teamController.js";
import featuresRoutes from "./features.js";
import authRoutes from "./auth.js";
import adminRoutes from "./admin.js";
import matchRoutes from "./match.js";
import funFactsRoutes from "./funFacts.js";

const router = Router();
// Merchandise route
router.use('/merchandise', merchandiseRoutes);
// Fun Facts route
router.use('/funFacts', funFactsRoutes);

// Player routes
router.get('/players', playerController.getAllPlayers);
router.get('/players/:id', playerController.getPlayerById);
router.post('/players', playerController.createPlayer);
router.put('/players/:id', playerController.updatePlayer);
router.delete('/players/:id', playerController.deletePlayer);

// Team routes
router.get('/teams', teamController.getAllTeams);
router.get('/teams/:id', teamController.getTeamById);
router.post('/teams', teamController.createTeam);
router.put('/teams/:id', teamController.updateTeam);
router.delete('/teams/:id', teamController.deleteTeam);

// Features routes (favorites, dream team)
router.use('/features', featuresRoutes);

// Match routes
router.use('/match', matchRoutes);

// Auth routes
router.use(authRoutes);

// Admin routes
router.use(adminRoutes);

export default router;