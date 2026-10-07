const express       = require('express');
const router        = express.Router();
const auth          = require('../middleware/auth');
const UserInventory = require('../models/UserInventory');

// ── GET /api/inventory ────────────────────────────────────────────────────────
router.get('/', auth, async (req, res) => {
  const inventory = await UserInventory.find({ userId: req.user.id }).lean();
  res.json(inventory);
});

// ── POST /api/inventory  (purchase a costume) ─────────────────────────────────
router.post('/', auth, async (req, res) => {
  const { costume_id } = req.body;
  if (!costume_id) return res.status(400).json({ error: 'costume_id is required' });

  // Prevent re-purchase
  const existing = await UserInventory.findOne({ userId: req.user.id, costume_id });
  if (existing) return res.status(409).json({ error: 'Costume already owned' });

  const item = await UserInventory.create({ userId: req.user.id, costume_id });
  res.status(201).json(item);
});

// ── PUT /api/inventory/:id  (equip / unequip) ─────────────────────────────────
router.put('/:id', auth, async (req, res) => {
  const { is_equipped } = req.body;
  if (is_equipped === undefined) {
    return res.status(400).json({ error: 'is_equipped field is required' });
  }

  const item = await UserInventory.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { is_equipped },
    { new: true }
  );

  if (!item) return res.status(404).json({ error: 'Inventory item not found' });
  res.json(item);
});

module.exports = router;
