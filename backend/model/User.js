import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  favoriteTeams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
});

const User = mongoose.model("User", userSchema);
export default User;
