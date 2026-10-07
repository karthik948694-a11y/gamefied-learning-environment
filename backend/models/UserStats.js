const mongoose = require('mongoose');

const userStatsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    xp:                  { type: Number, default: 0, min: 0 },
    xp_to_next_level:    { type: Number, default: 500 },
    coins:               { type: Number, default: 100, min: 0 },
    level:               { type: Number, default: 1, min: 1 },
    streak:              { type: Number, default: 0, min: 0 },
    longest_streak:      { type: Number, default: 0, min: 0 },
    total_study_minutes: { type: Number, default: 0, min: 0 },
    daily_goal_met:      { type: Boolean, default: false },
    last_login_date:     { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('UserStats', userStatsSchema);
