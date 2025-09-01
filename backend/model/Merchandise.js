import mongoose from 'mongoose';

const MerchandiseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  stock: { type: Number, default: 10 },
  category: { type: String }
});

const Merchandise = mongoose.model('Merchandise', MerchandiseSchema);
export default Merchandise;
