import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, User, Shirt, Trophy, LogOut, Volume2, VolumeX, Blocks } from "lucide-react";
import StreakCounter from "./StreakCounter";
import CoinDisplay from "./CoinDisplay";
import XPBar from "./XPBar";
import { useAuth } from "@/contexts/AuthContext";
import { useUserStats } from "@/hooks/useUserStats";
import { useBackgroundMusic } from "@/hooks/useBackgroundMusic";

const Navbar = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  const { stats } = useUserStats();
  const { isPlaying, toggle: toggleMusic } = useBackgroundMusic();

  const navItems = [
    { to: "/", icon: Home, label: "Quests" },
    { to: "/profile", icon: User, label: "Profile" },
    { to: "/shop", icon: Shirt, label: "Shop" },
    { to: "/leaderboard", icon: Trophy, label: "Leaderboard" },
    { to: "/choose", icon: Blocks, label: "Switch World" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🕎</span>
            <h1 className="font-display font-bold text-xl text-primary text-glow-primary hidden sm:block">
              Menorah
            </h1>
          </Link>

          {/* Center: XP Bar */}
          <div className="hidden md:flex">
            <XPBar
              level={stats?.level ?? 1}
              xp={stats?.xp ?? 0}
              xpToNext={stats?.xp_to_next_level ?? 500}
            />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <StreakCounter streak={stats?.streak ?? 0} dailyGoalMet={stats?.daily_goal_met ?? false} />
            <CoinDisplay coins={stats?.coins ?? 0} />

            {/* Nav Links */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`relative p-2 rounded-lg transition-colors ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                      />
                    )}
                  </Link>
                );
              })}
              <button
                onClick={toggleMusic}
                className="p-2 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors"
                title={isPlaying ? "Mute music" : "Play music"}
              >
                {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button
                onClick={signOut}
                className="p-2 rounded-lg text-muted-foreground hover:text-enemy hover:bg-enemy/10 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
