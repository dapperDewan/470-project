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
    const item = new Merchandise(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create merchandise.' });
  }
};
