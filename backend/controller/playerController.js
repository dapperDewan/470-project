import Player from '../model/Player.js';

const playerController = {
    // Get all players
    getAllPlayers: async (req, res) => {
        try {
            const players = await Player.find();
            res.json(players);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get a single player by ID
    getPlayerById: async (req, res) => {
        try {
            const player = await Player.findById(req.params.id);
            if (!player) {
                return res.status(404).json({ message: 'Player not found' });
            }
            res.json(player);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Create a new player
    createPlayer: async (req, res) => {
        const player = new Player(req.body);
        try {
            const newPlayer = await player.save();
            res.status(201).json(newPlayer);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Update a player
    updatePlayer: async (req, res) => {
        try {
            const player = await Player.findById(req.params.id);
            if (!player) {
                return res.status(404).json({ message: 'Player not found' });
            }
            
            Object.assign(player, req.body);
            const updatedPlayer = await player.save();
            res.json(updatedPlayer);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Delete a player
    deletePlayer: async (req, res) => {
        try {
            const player = await Player.findById(req.params.id);
            if (!player) {
                return res.status(404).json({ message: 'Player not found' });
            }
            
            await player.deleteOne();
            res.json({ message: 'Player deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default playerController;
