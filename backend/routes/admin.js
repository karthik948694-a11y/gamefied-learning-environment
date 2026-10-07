const express       = require('express');
const router        = express.Router();
const User          = require('../models/User');
const Profile       = require('../models/Profile');
const UserStats     = require('../models/UserStats');
const UserInventory = require('../models/UserInventory');
const UserProgress  = require('../models/UserProgress');

// ── Admin key middleware ───────────────────────────────────────────────────────
const adminAuth = (req, res, next) => {
  const key = req.header('x-admin-key');
  if (!key || key !== process.env.ADMIN_SECRET_KEY) {
    return res.status(403).json({ error: 'Forbidden: Invalid admin key' });
  }
  next();
};

// ── GET /api/admin/users ──────────────────────────────────────────────────────
// Returns all users with their profile + stats combined
router.get('/users', adminAuth, async (req, res) => {
  const users = await User.find().select('-password').lean();
  const userIds = users.map((u) => u._id);

  const [profiles, stats] = await Promise.all([
    Profile.find({ userId: { $in: userIds } }).lean(),
    UserStats.find({ userId: { $in: userIds } }).lean(),
  ]);

  const profileMap = new Map(profiles.map((p) => [p.userId.toString(), p]));
  const statsMap   = new Map(stats.map((s)   => [s.userId.toString(), s]));

  const result = users.map((u) => {
    const p = profileMap.get(u._id.toString());
    const s = statsMap.get(u._id.toString());
    return {
      user_id:      u._id,
      email:        u.email,
      display_name: p?.display_name  ?? 'Unknown',
      avatar_url:   p?.avatar_url    ?? null,
      coins:        s?.coins         ?? 0,
      xp:           s?.xp            ?? 0,
      level:        s?.level         ?? 1,
      streak:       s?.streak        ?? 0,
      created_at:   u.createdAt,
    };
  });

  res.json(result);
});

// ── PUT /api/admin/users/:id/coins ────────────────────────────────────────────
// Directly set the coin balance for a user
router.put('/users/:id/coins', adminAuth, async (req, res) => {
  const { coins } = req.body;

  if (coins === undefined || coins === null || isNaN(Number(coins))) {
    return res.status(400).json({ error: 'coins must be a valid number' });
  }

  const stats = await UserStats.findOneAndUpdate(
    { userId: req.params.id },
    { coins: Number(coins) },
    { new: true }
  );

  if (!stats) return res.status(404).json({ error: 'User stats not found' });
  res.json({ success: true, coins: stats.coins });
});

// ── DELETE /api/admin/users/:id ───────────────────────────────────────────────
// Hard delete a user and all related records
router.delete('/users/:id', adminAuth, async (req, res) => {
  const userId = req.params.id;

  await Promise.all([
    User.findByIdAndDelete(userId),
    Profile.findOneAndDelete({ userId }),
    UserStats.findOneAndDelete({ userId }),
    UserInventory.deleteMany({ userId }),
    UserProgress.deleteMany({ userId }),
  ]);

  res.json({ success: true, message: `User ${userId} and all related data deleted.` });
});

module.exports = router;
