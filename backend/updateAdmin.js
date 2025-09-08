import mongoose from 'mongoose';
import User from './model/User.js';
import dotenv from 'dotenv';

dotenv.config();

const updateAdminStatus = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // Update user 'araav' to be admin (case insensitive)
    const result = await User.updateOne(
      { username: { $regex: /^araav$/i } },
      { $set: { isAdmin: true } }
    );
    
    console.log(`Updated ${result.modifiedCount} user(s) to admin status`);
    
    // Check the user
    const user = await User.findOne({ username: { $regex: /^araav$/i } });
    if (user) {
      console.log(`User ${user.username} admin status: ${user.isAdmin}`);
    } else {
      console.log('User araav not found');
    }
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    mongoose.connection.close();
  }
};

updateAdminStatus();
