import Team from '../model/Team.js';

const teamController = {
    // Get all teams
    getAllTeams: async (req, res) => {
        try {
            const teams = await Team.find().populate('roster');
            res.json(teams);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Get single team by ID
    getTeamById: async (req, res) => {
        try {
            const team = await Team.findById(req.params.id).populate('roster');
            if (!team) {
                return res.status(404).json({ message: 'Team not found' });
            }
            res.json(team);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // Create a new team
    createTeam: async (req, res) => {
        const team = new Team(req.body);
        try {
            const newTeam = await team.save();
            res.status(201).json(newTeam);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Update a team
    updateTeam: async (req, res) => {
        try {
            const team = await Team.findById(req.params.id);
            if (!team) {
                return res.status(404).json({ message: 'Team not found' });
            }
            
            Object.assign(team, req.body);
            const updatedTeam = await team.save();
            res.json(updatedTeam);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    // Delete a team
    deleteTeam: async (req, res) => {
        try {
            const team = await Team.findById(req.params.id);
            if (!team) {
                return res.status(404).json({ message: 'Team not found' });
            }
            
            await team.deleteOne();
            res.json({ message: 'Team deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default teamController;
