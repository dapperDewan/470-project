import mongoose from 'mongoose';
import Player from '../model/Player.js';
import Team from '../model/Team.js';
import dotenv from 'dotenv';

dotenv.config();

const teams = [
  {
    name: 'Lakers',
    city: 'Los Angeles',
    conference: 'Western',
    division: 'Pacific',
    logo: 'https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg',
    championships: 17,
    establishedYear: 1947
  },
  {
    name: 'Warriors',
    city: 'Golden State',
    conference: 'Western',
    division: 'Pacific',
    logo: 'https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg',
    championships: 7,
    establishedYear: 1946
  },
  {
    name: 'Celtics',
    city: 'Boston',
    conference: 'Eastern',
    division: 'Atlantic',
    logo: 'https://cdn.nba.com/logos/nba/1610612738/primary/L/logo.svg',
    championships: 18,
    establishedYear: 1946
  },
  {
    name: 'Heat',
    city: 'Miami',
    conference: 'Eastern',
    division: 'Southeast',
    logo: 'https://cdn.nba.com/logos/nba/1610612748/primary/L/logo.svg',
    championships: 3,
    establishedYear: 1988
  },
  {
    name: 'Bucks',
    city: 'Milwaukee',
    conference: 'Eastern',
    division: 'Central',
    logo: 'https://cdn.nba.com/logos/nba/1610612749/primary/L/logo.svg',
    championships: 2,
    establishedYear: 1968
  },
  {
    name: 'Nets',
    city: 'Brooklyn',
    conference: 'Eastern',
    division: 'Atlantic',
    logo: 'https://cdn.nba.com/logos/nba/1610612751/primary/L/logo.svg',
    championships: 0,
    establishedYear: 1967
  },
  {
    name: 'Nuggets',
    city: 'Denver',
    conference: 'Western',
    division: 'Northwest',
    logo: 'https://cdn.nba.com/logos/nba/1610612743/primary/L/logo.svg',
    championships: 1,
    establishedYear: 1967
  },
  {
    name: 'Mavericks',
    city: 'Dallas',
    conference: 'Western',
    division: 'Southwest',
    logo: 'https://cdn.nba.com/logos/nba/1610612742/primary/L/logo.svg',
    championships: 1,
    establishedYear: 1980
  }
];

const players = [
  {
    name: 'LeBron James',
    team: 'Los Angeles Lakers',
    position: 'Forward',
    number: 23,
    height: '6\'9"',
    weight: '250 lbs',
    age: 39,
    stats: {
      pointsPerGame: 25.3,
      assistsPerGame: 8.3,
      reboundsPerGame: 7.3
    },
    image: 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png'
  },
  {
    name: 'Stephen Curry',
    team: 'Golden State Warriors',
    position: 'Guard',
    number: 30,
    height: '6\'2"',
    weight: '185 lbs',
    age: 35,
    stats: {
      pointsPerGame: 26.4,
      assistsPerGame: 5.1,
      reboundsPerGame: 4.5
    },
    image: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png'
  },
  {
    name: 'Jayson Tatum',
    team: 'Boston Celtics',
    position: 'Forward',
    number: 0,
    height: '6\'8"',
    weight: '210 lbs',
    age: 25,
    stats: {
      pointsPerGame: 26.9,
      assistsPerGame: 4.9,
      reboundsPerGame: 8.1
    },
    image: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1628369.png'
  },
  {
    name: 'Jimmy Butler',
    team: 'Miami Heat',
    position: 'Forward',
    number: 22,
    height: '6\'7"',
    weight: '230 lbs',
    age: 34,
    stats: {
      pointsPerGame: 20.9,
      assistsPerGame: 4.3,
      reboundsPerGame: 5.3
    },
    image: 'https://cdn.nba.com/headshots/nba/latest/1040x760/202710.png'
  },
  {
    name: 'Giannis Antetokounmpo',
    team: 'Milwaukee Bucks',
    position: 'Forward',
    number: 34,
    height: '6\'11"',
    weight: '243 lbs',
    age: 29,
    stats: {
      pointsPerGame: 30.4,
      assistsPerGame: 6.5,
      reboundsPerGame: 11.5
    },
    image: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203507.png'
  },
  {
    name: 'Kevin Durant',
    team: 'Brooklyn Nets',
    position: 'Forward',
    number: 7,
    height: '6\'10"',
    weight: '240 lbs',
    age: 35,
    stats: {
      pointsPerGame: 29.7,
      assistsPerGame: 5.0,
      reboundsPerGame: 6.7
    },
    image: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201142.png'
  },
  {
    name: 'Nikola Jokic',
    team: 'Denver Nuggets',
    position: 'Center',
    number: 15,
    height: '6\'11"',
    weight: '284 lbs',
    age: 29,
    stats: {
      pointsPerGame: 26.4,
      assistsPerGame: 9.0,
      reboundsPerGame: 12.4
    },
    image: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203999.png'
  },
  {
    name: 'Luka Doncic',
    team: 'Dallas Mavericks',
    position: 'Guard',
    number: 77,
    height: '6\'7"',
    weight: '230 lbs',
    age: 25,
    stats: {
      pointsPerGame: 32.4,
      assistsPerGame: 9.1,
      reboundsPerGame: 8.6
    },
    image: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png'
  },
  {
    name: 'Anthony Davis',
    team: 'Los Angeles Lakers',
    position: 'Forward-Center',
    number: 3,
    height: '6\'10"',
    weight: '253 lbs',
    age: 31,
    stats: {
      pointsPerGame: 24.7,
      assistsPerGame: 3.5,
      reboundsPerGame: 12.6
    },
    image: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203076.png'
  },
  {
    name: 'Klay Thompson',
    team: 'Golden State Warriors',
    position: 'Guard',
    number: 11,
    height: '6\'6"',
    weight: '220 lbs',
    age: 34,
    stats: {
      pointsPerGame: 17.9,
      assistsPerGame: 2.3,
      reboundsPerGame: 4.1
    },
    image: 'https://cdn.nba.com/headshots/nba/latest/1040x760/202691.png'
  },
  {
    name: 'Jaylen Brown',
    team: 'Boston Celtics',
    position: 'Guard-Forward',
    number: 7,
    height: '6\'6"',
    weight: '223 lbs',
    age: 27,
    stats: {
      pointsPerGame: 23.0,
      assistsPerGame: 3.6,
      reboundsPerGame: 7.1
    },
    image: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1627759.png'
  },
  {
    name: 'Bam Adebayo',
    team: 'Miami Heat',
    position: 'Center',
    number: 13,
    height: '6\'9"',
    weight: '255 lbs',
    age: 26,
    stats: {
      pointsPerGame: 19.3,
      assistsPerGame: 3.4,
      reboundsPerGame: 10.4
    },
    image: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1628389.png'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Player.deleteMany({});
    await Team.deleteMany({});
    console.log('Cleared existing data');

    // Insert teams
    const insertedTeams = await Team.insertMany(teams);
    console.log(`Inserted ${insertedTeams.length} teams`);

    // Insert players
    const insertedPlayers = await Player.insertMany(players);
    console.log(`Inserted ${insertedPlayers.length} players`);

    // Update team rosters with player references
    for (const team of insertedTeams) {
      const teamPlayers = insertedPlayers.filter(player => 
        player.team.includes(team.name) || player.team.includes(team.city)
      );
      
      if (teamPlayers.length > 0) {
        team.roster = teamPlayers.map(player => player._id);
        await team.save();
        console.log(`Updated ${team.name} roster with ${teamPlayers.length} players`);
      }
    }

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
