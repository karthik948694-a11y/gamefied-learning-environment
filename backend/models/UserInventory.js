const mongoose = require('mongoose');

const userInventorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    costume_id: {
      type: String,
      required: [true, 'costume_id is required'],
      trim: true,
    },
    is_equipped: {
      type: Boolean,
      default: false,
    },
    purchased_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Prevent duplicate costume ownership per user
userInventorySchema.index({ userId: 1, costume_id: 1 }, { unique: true });

module.exports = mongoose.model('UserInventory', userInventorySchema);
