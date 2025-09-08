import mongoose from 'mongoose';
import Player from '../model/Player.js';
import Team from '../model/Team.js';
import dotenv from 'dotenv';

dotenv.config();

async function verifyData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const players = await Player.find({}).limit(5);
    const teams = await Team.find({}).limit(5);

    console.log('\n=== SAMPLE PLAYERS ===');
    players.forEach(player => {
      console.log(`${player.name} - ${player.team} - ${player.position} #${player.number}`);
      console.log(`  Image: ${player.image || 'No image'}`);
      console.log(`  Stats: ${player.stats.pointsPerGame} PPG, ${player.stats.assistsPerGame} APG, ${player.stats.reboundsPerGame} RPG\n`);
    });

    console.log('\n=== SAMPLE TEAMS ===');
    teams.forEach(team => {
      console.log(`${team.city} ${team.name} - ${team.conference} Conference`);
      console.log(`  Logo: ${team.logo || 'No logo'}`);
      console.log(`  Roster size: ${team.roster.length} players`);
      console.log(`  Championships: ${team.championships}\n`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

verifyData();
