const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    subject_id:  { type: String, required: true },
    chapter_id:  { type: String, required: true },
    question_id: { type: String, required: true },
    is_correct:  { type: Boolean, required: true },
    answered_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('UserProgress', userProgressSchema);
