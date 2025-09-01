import mongoose from 'mongoose';
import Merchandise from '../model/Merchandise.js';
import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

const items = [
  {
    name: 'NBA Basketball',
    description: 'Spalding official game ball.',
    price: 49.99,
  image: 'https://media.gettyimages.com/id/73046507/photo/nba-basketballs.jpg?s=2048x2048&w=gi&k=20&c=jSYnAtGHmVdb4nsU6MxpwNajyQfZiMESWpqFriCkprY=',
    stock: 14,
    category: 'Equipment'
  },
  {
    name: 'NBA Jersey',
    description: 'Official team jersey. Various teams available.',
    price: 89.99,
    image: 'https://fanatics.frgimages.com/ff/image/upload/q_auto:best,w_900,c_fill,g_auto,dpr_2.0/fanatics-prod/NBASTORE/NBASTORE/NBASTORE_jersey.jpg',
    stock: 19,
    category: 'Apparel'
  },
  {
    name: 'NBA Socks',
    description: 'Comfortable and stylish socks for fans.',
    price: 12.99,
    image: 'https://nbastore.com/cdn/shop/products/NBA_Socks_White_1024x1024.jpg?v=1616161616',
    stock: 40,
    category: 'Apparel'
  },
  {
    name: 'NBA Cap',
    description: 'Team logo cap. Adjustable size.',
    price: 24.99,
    image: 'https://nbastore.com/cdn/shop/products/NBA_Cap_Blue_1024x1024.jpg?v=1616161616',
    stock: 29,
    category: 'Apparel'
  },
  {
    name: 'NBA Water Bottle',
    description: 'Stay hydrated with your favorite team.',
    price: 14.99,
    image: 'https://nbastore.com/cdn/shop/products/NBA_Water_Bottle_1024x1024.jpg?v=1616161616',
    stock: 25,
    category: 'Accessories'
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Merchandise.deleteMany({});
  await Merchandise.insertMany(items);
  console.log('Merchandise seeded!');
  mongoose.disconnect();
}

seed();
