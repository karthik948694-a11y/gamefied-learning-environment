const express   = require('express');
const router    = express.Router();
const auth      = require('../middleware/auth');
const UserStats = require('../models/UserStats');
const Profile   = require('../models/Profile');

// Whitelist of fields that the frontend is allowed to update
const ALLOWED_STAT_FIELDS = [
  'xp',
  'xp_to_next_level',
  'coins',
  'level',
  'streak',
  'longest_streak',
  'total_study_minutes',
  'daily_goal_met',
  'last_login_date',
];

// ── GET /api/stats ────────────────────────────────────────────────────────────
router.get('/', auth, async (req, res) => {
  const stats = await UserStats.findOne({ userId: req.user.id });
  if (!stats) return res.status(404).json({ error: 'Stats not found' });
  res.json(stats);
});

// ── PUT /api/stats ────────────────────────────────────────────────────────────
router.put('/', auth, async (req, res) => {
  const updates = {};
  ALLOWED_STAT_FIELDS.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No valid fields to update' });
  }

  const stats = await UserStats.findOneAndUpdate(
    { userId: req.user.id },
    updates,
    { new: true, runValidators: true }
  );

  if (!stats) return res.status(404).json({ error: 'Stats not found' });
  res.json(stats);
});

// ── GET /api/stats/leaderboard ────────────────────────────────────────────────
// Returns top 50 users sorted by XP descending (for Leaderboard page)
router.get('/leaderboard', auth, async (req, res) => {
  const allStats = await UserStats.find().sort({ xp: -1 }).limit(50).lean();

  const userIds = allStats.map((s) => s.userId);
  const profiles = await Profile.find({ userId: { $in: userIds } }).lean();

  const profileMap = new Map(
    profiles.map((p) => [p.userId.toString(), p])
  );

  const leaderboard = allStats.map((s) => ({
    userId:       s.userId,
    display_name: profileMap.get(s.userId.toString())?.display_name || 'Unknown Hero',
    xp:           s.xp,
    level:        s.level,
    streak:       s.streak,
    coins:        s.coins,
  }));

  res.json(leaderboard);
});

module.exports = router;
