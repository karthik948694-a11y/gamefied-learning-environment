const express      = require('express');
const router       = express.Router();
const auth         = require('../middleware/auth');
const UserProgress = require('../models/UserProgress');

// ── GET /api/progress ─────────────────────────────────────────────────────────
router.get('/', auth, async (req, res) => {
  const progress = await UserProgress.find({ userId: req.user.id }).lean();
  res.json(progress);
});

// ── POST /api/progress  (record a quiz answer) ────────────────────────────────
router.post('/', auth, async (req, res) => {
  const { subject_id, chapter_id, question_id, is_correct } = req.body;

  if (!subject_id || !chapter_id || !question_id || is_correct === undefined) {
    return res.status(400).json({
      error: 'subject_id, chapter_id, question_id and is_correct are required',
    });
  }

  const entry = await UserProgress.create({
    userId: req.user.id,
    subject_id,
    chapter_id,
    question_id,
    is_correct,
  });

  res.status(201).json(entry);
});

module.exports = router;
