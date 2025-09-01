import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import Match from '../model/Match.js';

const matches = [
  {
    homeTeam: 'Los Angeles Lakers',
    awayTeam: 'Golden State Warriors',
    date: new Date('2025-09-01T19:00:00'),
    venue: 'Crypto.com Arena',
    status: 'upcoming'
  },
  {
    homeTeam: 'Milwaukee Bucks',
    awayTeam: 'Boston Celtics',
    date: new Date('2025-09-02T19:00:00'),
    venue: 'Fiserv Forum',
    status: 'upcoming'
  },
  {
    homeTeam: 'Phoenix Suns',
    awayTeam: 'Dallas Mavericks',
    date: new Date('2025-09-03T19:00:00'),
    venue: 'Footprint Center',
    status: 'upcoming'
  },
  {
    homeTeam: 'Miami Heat',
    awayTeam: 'Chicago Bulls',
    date: new Date('2025-09-04T19:00:00'),
    venue: 'Kaseya Center',
    status: 'upcoming'
  }
  ,
  {
    homeTeam: 'Brooklyn Nets',
    awayTeam: 'Toronto Raptors',
    date: new Date('2025-09-05T19:00:00'),
    venue: 'Barclays Center',
    status: 'upcoming'
  },
  {
    homeTeam: 'Philadelphia 76ers',
    awayTeam: 'Denver Nuggets',
    date: new Date('2025-09-06T19:00:00'),
    venue: 'Wells Fargo Center',
    status: 'upcoming'
  },
  {
    homeTeam: 'Houston Rockets',
    awayTeam: 'San Antonio Spurs',
    date: new Date('2025-09-07T19:00:00'),
    venue: 'Toyota Center',
    status: 'upcoming'
  },
  {
    homeTeam: 'New York Knicks',
    awayTeam: 'Atlanta Hawks',
    date: new Date('2025-09-08T19:00:00'),
    venue: 'Madison Square Garden',
    status: 'upcoming'
  }
];

async function seed() {
  console.log('MONGO_URI:', process.env.MONGO_URI);
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is undefined. Make sure your .env file is present and you are running the script from the backend directory.');
  }
  await mongoose.connect(process.env.MONGO_URI);
  await Match.deleteMany({});
  await Match.insertMany(matches);
  console.log('Match fixtures seeded!');
  mongoose.disconnect();
}

seed();
