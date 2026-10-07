import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Flame, Star, Medal, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import api from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  level: number;
  streak: number;
  isCurrentUser: boolean;
}

const demoUsers: Omit<LeaderboardEntry, "rank" | "isCurrentUser">[] = [
  { name: "DragonSlayer99", xp: 12400, level: 24, streak: 45 },
  { name: "CodeNinja", xp: 11200, level: 22, streak: 38 },
  { name: "PixelMage", xp: 9800, level: 19, streak: 30 },
  { name: "QuestMaster", xp: 8500, level: 17, streak: 25 },
  { name: "CyberKnight", xp: 7200, level: 15, streak: 20 },
  { name: "ArcaneWiz", xp: 6100, level: 13, streak: 18 },
  { name: "ShadowBlade", xp: 5400, level: 11, streak: 15 },
  { name: "ThunderBolt", xp: 4800, level: 10, streak: 12 },
  { name: "IronWolf", xp: 3900, level: 8, streak: 9 },
  { name: "StarGazer", xp: 3200, level: 7, streak: 7 },
  { name: "PhoenixRise", xp: 2800, level: 6, streak: 5 },
  { name: "FrostBite", xp: 2100, level: 5, streak: 3 },
];

const rankIcons = ["🥇", "🥈", "🥉"];

type SortKey = "xp" | "streak" | "level";

const Leaderboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [timeFilter, setTimeFilter] = useState<"weekly" | "monthly">("weekly");
  const [sortBy, setSortBy] = useState<SortKey>("xp");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      let realUsers: Omit<LeaderboardEntry, "rank" | "isCurrentUser">[] = [];

      try {
        const { data } = await api.get("/stats/leaderboard");
        if (Array.isArray(data)) {
          realUsers = data.map((item: any) => ({
            name: item.display_name || "Unknown Hero",
            xp: item.xp || 0,
            level: item.level || 1,
            streak: item.streak || 0,
          }));
        }
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      }

      // Scale demo data based on time filter
      const scale = timeFilter === "weekly" ? 0.3 : 1;
      const combined = [
        ...realUsers,
        ...demoUsers.map((d) => ({
          ...d,
          xp: Math.round(d.xp * scale),
          streak: Math.round(d.streak * scale),
        })),
      ];

      combined.sort((a, b) => b[sortBy] - a[sortBy]);

      const ranked: LeaderboardEntry[] = combined.map((entry, i) => {
        return {
          ...entry,
          rank: i + 1,
          isCurrentUser: Boolean(user && user.displayName && entry.name.toLowerCase() === user.displayName.toLowerCase()),
        };
      });

      setEntries(ranked);
    };

    fetchLeaderboard();
  }, [user, timeFilter, sortBy]);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-accent" />
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                Leaderboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Top heroes ranked by glory
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Tabs
            value={timeFilter}
            onValueChange={(v) => setTimeFilter(v as "weekly" | "monthly")}
          >
            <TabsList>
              <TabsTrigger value="weekly">📅 Weekly</TabsTrigger>
              <TabsTrigger value="monthly">📆 Monthly</TabsTrigger>
            </TabsList>
          </Tabs>

          <Tabs value={sortBy} onValueChange={(v) => setSortBy(v as SortKey)}>
            <TabsList>
              <TabsTrigger value="xp">
                <Star className="w-3 h-3 mr-1" /> XP
              </TabsTrigger>
              <TabsTrigger value="streak">
                <Flame className="w-3 h-3 mr-1" /> Streak
              </TabsTrigger>
              <TabsTrigger value="level">
                <Medal className="w-3 h-3 mr-1" /> Level
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {entries.slice(0, 3).map((entry, i) => (
            <motion.div
              key={entry.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`game-card text-center ${
                entry.isCurrentUser ? "border-primary glow-primary" : "border-accent/30"
              } ${i === 0 ? "order-2" : i === 1 ? "order-1 mt-4" : "order-3 mt-6"}`}
            >
              <span className="text-3xl sm:text-4xl block mb-2">
                {rankIcons[i]}
              </span>
              <p className="font-display font-bold text-sm sm:text-base text-foreground truncate">
                {entry.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Level {entry.level}
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-xs text-xp font-bold flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {entry.xp.toLocaleString()}
                </span>
                <span className="text-xs text-streak font-bold flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  {entry.streak}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Remaining Rankings */}
        <div className="space-y-2">
          {entries.slice(3).map((entry, i) => (
            <motion.div
              key={entry.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className={`game-card flex items-center gap-4 py-3 ${
                entry.isCurrentUser ? "border-primary/50 bg-primary/5" : ""
              }`}
            >
              <span className="font-display font-bold text-lg text-muted-foreground w-8 text-center">
                {entry.rank}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-sm text-foreground truncate">
                  {entry.name}
                  {entry.isCurrentUser && (
                    <span className="text-primary ml-2 text-xs">(You)</span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  Level {entry.level}
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-xp font-bold flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {entry.xp.toLocaleString()}
                </span>
                <span className="text-streak font-bold flex items-center gap-1">
                  <Flame className="w-3 h-3" />
                  {entry.streak}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
