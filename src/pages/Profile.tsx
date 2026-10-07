import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Clock, BookOpen, Trophy, Star, Target, Camera } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserStats } from "@/hooks/useUserStats";
import defaultCharacter from "@/assets/default-character.png";

const profilePictures = [
  { id: "default", label: "Default Hero", src: defaultCharacter },
  { id: "knight", label: "Knight", emoji: "🤴🏻" },
  { id: "wizard", label: "Wizard", emoji: "🧙" },
  { id: "ninja", label: "Ninja", emoji: "🥷" },
  { id: "robot", label: "Robot", emoji: "🤖" },
  { id: "alien", label: "Alien", emoji: "👽" },
  { id: "lion", label: "Lion", emoji: "🦁" },
  { id: "dragon", label: "Dragon", emoji: "🐲" },
  { id: "skull", label: "Skull", emoji: "💀" },
  { id: "devil", label: "Devil", emoji: "😈" },
  { id: "cat", label: "Cat", emoji: "🐱" },
  { id: "frog", label: "Frog", emoji: "🐸" },
];

const Profile = () => {
  const { user } = useAuth();
  const { stats, profile, loading } = useUserStats();
  const [showPicPicker, setShowPicPicker] = useState(false);
  const [selectedPic, setSelectedPic] = useState<string>("default");

  if (loading || !stats || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  const xpPercent = Math.round((stats.xp / stats.xp_to_next_level) * 100);
  const activePic = profilePictures.find((p) => p.id === selectedPic);

  const statItems = [
    { icon: Flame, label: "Current Streak", value: `${stats.streak} days`, color: "text-streak" },
    { icon: Trophy, label: "Longest Streak", value: `${stats.longest_streak} days`, color: "text-accent" },
    { icon: Clock, label: "Study Hours", value: `${Math.floor(stats.total_study_minutes / 60)}h`, color: "text-primary" },
    { icon: BookOpen, label: "Level", value: `Lv.${stats.level}`, color: "text-xp" },
    { icon: Target, label: "Daily Goal", value: stats.daily_goal_met ? "✓ Done" : "Pending", color: stats.daily_goal_met ? "text-xp" : "text-muted-foreground" },
  ];

  const streakDays = Array.from({ length: 30 }, (_, i) => i < stats.streak);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="game-card border border-primary/30 mb-8"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <motion.div
                className="w-32 h-32 rounded-2xl overflow-hidden border-2 border-primary/50 glow-primary bg-secondary flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowPicPicker(!showPicPicker)}
              >
                {activePic?.src ? (
                  <img src={activePic.src} alt="Character" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-6xl">{activePic?.emoji}</span>
                )}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </motion.div>
              <div className="absolute -bottom-2 -right-2 bg-accent text-accent-foreground text-xs font-display font-bold px-2 py-0.5 rounded-full">
                Lv.{stats.level}
              </div>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="font-display text-3xl font-black text-foreground mb-1">
                {profile.display_name}
              </h1>
              <p className="text-muted-foreground text-sm mb-1">Menorah Adventurer</p>

              <div className="max-w-sm">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Star className="w-3 h-3 text-accent fill-accent" /> Level {stats.level}
                  </span>
                  <span className="text-xp font-bold">{xpPercent}%</span>
                </div>
                <div className="h-4 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="progress-bar-fill bg-xp"
                    initial={{ width: 0 }}
                    animate={{ width: `${xpPercent}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats.xp} / {stats.xp_to_next_level} XP to next level
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl">💰</span>
              <span className="font-display text-2xl font-bold text-coin">{stats.coins}</span>
              <span className="text-xs text-muted-foreground">coins</span>
            </div>
          </div>

          {/* Profile Picture Picker */}
          <AnimatePresence>
            {showPicPicker && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-4 border-t border-border">
                  <h3 className="font-display font-bold text-sm text-muted-foreground mb-3">Choose Profile Picture</h3>
                  <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                    {profilePictures.map((pic) => (
                      <motion.button
                        key={pic.id}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setSelectedPic(pic.id);
                          setShowPicPicker(false);
                        }}
                        className={`aspect-square rounded-xl flex items-center justify-center border-2 transition-colors ${
                          selectedPic === pic.id
                            ? "border-primary bg-primary/20"
                            : "border-border bg-secondary hover:border-primary/40"
                        }`}
                      >
                        {pic.src ? (
                          <img src={pic.src} alt={pic.label} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <span className="text-2xl">{pic.emoji}</span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {statItems.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="game-card text-center"
            >
              <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
              <p className={`font-display font-bold text-lg ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Streak Calendar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="game-card border border-streak/30"
        >
          <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
            <Flame className="w-5 h-5 text-streak" />
            Streak Calendar (Last 30 Days)
          </h3>
          <div className="grid grid-cols-10 gap-2">
            {[...streakDays].reverse().map((active, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.02 }}
                className={`aspect-square rounded-md flex items-center justify-center text-xs ${
                  active
                    ? "bg-streak/20 border border-streak/40 text-streak"
                    : "bg-secondary border border-border text-muted-foreground/30"
                }`}
              >
                {active ? "🔥" : "·"}
              </motion.div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Keep logging in daily and studying for 1 hour to maintain your streak!
            {stats.streak >= 7 && " 🎉 You're on a 7+ day streak — bonus effects active!"}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
