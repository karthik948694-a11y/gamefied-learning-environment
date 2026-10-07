const express = require('express');
const router  = express.Router();
const jwt     = require('jsonwebtoken');
const User      = require('../models/User');
const Profile   = require('../models/Profile');
const UserStats = require('../models/UserStats');
const auth      = require('../middleware/auth');

// ── Helper ────────────────────────────────────────────────────────────────────
const generateToken = (userId) =>
  jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '30d' });

const todayStr = () => new Date().toISOString().split('T')[0];
const yesterdayStr = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

// ── POST /api/auth/signup ─────────────────────────────────────────────────────
router.post('/signup', async (req, res) => {
  const { email, password, displayName } = req.body;

  if (!email || !password || !displayName) {
    return res.status(400).json({ error: 'email, password and displayName are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  // Check duplicate email
  const existing = await User.findOne({ email: email.toLowerCase().trim() });
  if (existing) {
    return res.status(409).json({ error: 'Email already registered' });
  }

  // Create user
  const user = await User.create({ email: email.toLowerCase().trim(), password });

  // Create profile
  await Profile.create({ userId: user._id, display_name: displayName });

  // Create initial stats (demo users get 10 000 coins)
  const isDemo = displayName.toLowerCase().startsWith('demo');
  await UserStats.create({
    userId: user._id,
    coins: isDemo ? 10000 : 100,
    last_login_date: todayStr(),
  });

  const token = generateToken(user._id);

  res.status(201).json({
    token,
    user: {
      id:          user._id,
      email:       user.email,
      displayName,
    },
    isDemo,
  });
});

// ── POST /api/auth/login ──────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // ── Streak logic ──────────────────────────────────────────────────────────
  const stats = await UserStats.findOne({ userId: user._id });
  if (stats) {
    const today     = todayStr();
    const yesterday = yesterdayStr();
    const lastLogin = stats.last_login_date;

    if (lastLogin !== today) {
      let newStreak = stats.streak;

      if (lastLogin === yesterday) {
        newStreak += 1; // Continued streak
      } else {
        newStreak = 1;  // Broken streak — restart
      }

      const newLongest = Math.max(stats.longest_streak, newStreak);

      await UserStats.updateOne(
        { userId: user._id },
        {
          streak:          newStreak,
          longest_streak:  newLongest,
          last_login_date: today,
          daily_goal_met:  false, // Reset for new day
        }
      );
    }
  }

  const profile = await Profile.findOne({ userId: user._id });
  const token   = generateToken(user._id);

  res.json({
    token,
    user: {
      id:          user._id,
      email:       user.email,
      displayName: profile?.display_name || '',
    },
  });
});

// ── GET /api/auth/me ──────────────────────────────────────────────────────────
router.get('/me', auth, async (req, res) => {
  const user    = await User.findById(req.user.id).select('-password');
  const profile = await Profile.findOne({ userId: req.user.id });

  if (!user) return res.status(404).json({ error: 'User not found' });

  res.json({
    id:          user._id,
    email:       user.email,
    displayName: profile?.display_name || '',
  });
});

module.exports = router;
