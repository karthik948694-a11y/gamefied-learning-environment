const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/auth');
const Profile = require('../models/Profile');

// ── GET /api/profile ──────────────────────────────────────────────────────────
router.get('/', auth, async (req, res) => {
  const profile = await Profile.findOne({ userId: req.user.id });
  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  res.json(profile);
});

// ── PUT /api/profile ──────────────────────────────────────────────────────────
router.put('/', auth, async (req, res) => {
  const { display_name, avatar_url } = req.body;
  const updates = {};
  if (display_name !== undefined) updates.display_name = display_name;
  if (avatar_url   !== undefined) updates.avatar_url   = avatar_url;

  const profile = await Profile.findOneAndUpdate(
    { userId: req.user.id },
    updates,
    { new: true, runValidators: true }
  );

  if (!profile) return res.status(404).json({ error: 'Profile not found' });
  res.json(profile);
});

module.exports = router;
