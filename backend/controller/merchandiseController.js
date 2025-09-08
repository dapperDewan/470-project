import Merchandise from '../model/Merchandise.js';

export const getAllMerchandise = async (req, res) => {
  try {
    const items = await Merchandise.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch merchandise.' });
  }
};

export const buyMerchandise = async (req, res) => {
  try {
    const item = await Merchandise.findById(req.params.id);
    if (!item || item.stock <= 0) {
      return res.status(400).json({ error: 'Item not available.' });
    }
    item.stock -= 1;
    await item.save();
    res.json({ message: 'Purchase successful!', item });
  } catch (err) {
    res.status(500).json({ error: 'Failed to buy merchandise.' });
  }
};

export const createMerchandise = async (req, res) => {
  try {
    const item = new Merchandise({ ...req.body, verified: false });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create merchandise.' });
  }
};

// Admin: verify merchandise
export const verifyMerchandise = async (req, res) => {
  try {
    const item = await Merchandise.findByIdAndUpdate(req.params.id, { verified: true }, { new: true });
    if (!item) return res.status(404).json({ error: 'Item not found.' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to verify merchandise.' });
  }
};

// Admin: delete merchandise
export const deleteMerchandise = async (req, res) => {
  try {
    const item = await Merchandise.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found.' });
    res.json({ message: 'Deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete merchandise.' });
  }
};
