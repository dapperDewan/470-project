const mongoose = require('mongoose');
const Player = require('./model/Player');

const players = [
  {
    name: 'LeBron James',
    team: 'Los Angeles Lakers',
    position: 'Small Forward',
    number: 6,
    height: "6'9\"",
    weight: 250,
    age: 39,
    stats: { pointsPerGame: 27, assistsPerGame: 7, reboundsPerGame: 7 },
    image: 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png'
  },
  {
    name: 'Stephen Curry',
    team: 'Golden State Warriors',
    position: 'Point Guard',
    number: 30,
    height: "6'2\"",
    weight: 185,
    age: 37,
    stats: { pointsPerGame: 29, assistsPerGame: 6, reboundsPerGame: 5 },
    image: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201939.png'
  },
  {
    name: 'Giannis Antetokounmpo',
    team: 'Milwaukee Bucks',
    position: 'Power Forward',
    number: 34,
    height: "6'11\"",
    weight: 242,
    age: 30,
    stats: { pointsPerGame: 31, assistsPerGame: 6, reboundsPerGame: 12 },
    image: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203507.png'
  },
  {
    name: 'Kevin Durant',
    team: 'Phoenix Suns',
    position: 'Small Forward',
    number: 35,
    height: "6'10\"",
    weight: 240,
    age: 36,
    stats: { pointsPerGame: 28, assistsPerGame: 5, reboundsPerGame: 7 },
    image: 'https://cdn.nba.com/headshots/nba/latest/1040x760/201142.png'
  },
  {
    name: 'Luka Doncic',
    team: 'Dallas Mavericks',
    position: 'Shooting Guard',
    number: 77,
    height: "6'7\"",
    weight: 230,
    age: 26,
    stats: { pointsPerGame: 32, assistsPerGame: 9, reboundsPerGame: 8 },
    image: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629029.png'
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Player.deleteMany({});
  await Player.insertMany(players);
  console.log('Seeded players!');
  process.exit();
}

seed();
