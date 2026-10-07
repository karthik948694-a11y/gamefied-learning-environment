import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Coins,
  Trophy,
  Flame,
  PlusCircle,
  Trash2,
  RefreshCw,
  LogOut,
  Search,
  ArrowLeft,
  Star,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
  Plus,
  AlertTriangle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import api from "@/lib/api";
import { setAdminAuthenticated } from "@/lib/adminAuth";
import { toast } from "@/hooks/use-toast";

interface AdminUserItem {
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  coins: number;
  xp: number;
  level: number;
  streak: number;
  created_at?: string;
  is_demo?: boolean;
}

const ADMIN_KEY_HEADER = { headers: { "x-admin-key": "questlearn_admin_secret_2024_vB5nM8kP" } };

const DEFAULT_DEMO_ADMIN_USERS: AdminUserItem[] = [
  { user_id: "demo-user-1", display_name: "DragonSlayer99", avatar_url: null, coins: 12500, xp: 12400, level: 24, streak: 45, is_demo: true },
  { user_id: "demo-user-2", display_name: "CodeNinja", avatar_url: null, coins: 8900, xp: 11200, level: 22, streak: 38, is_demo: true },
  { user_id: "demo-user-3", display_name: "PixelMage", avatar_url: null, coins: 6400, xp: 9800, level: 19, streak: 30, is_demo: true },
  { user_id: "demo-user-4", display_name: "QuestMaster", avatar_url: null, coins: 4100, xp: 8500, level: 17, streak: 25, is_demo: true },
  { user_id: "demo-user-5", display_name: "CyberKnight", avatar_url: null, coins: 3200, xp: 7200, level: 15, streak: 20, is_demo: true },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [usersList, setUsersList] = useState<AdminUserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"coins" | "xp" | "level" | "name">("coins");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Coin increase modal state
  const [selectedUserForCoins, setSelectedUserForCoins] = useState<AdminUserItem | null>(null);
  const [coinAddAmount, setCoinAddAmount] = useState<string>("500");
  const [isUpdatingCoins, setIsUpdatingCoins] = useState(false);

  // Delete user confirm modal state
  const [userToDelete, setUserToDelete] = useState<AdminUserItem | null>(null);
  const [isDeletingUser, setIsDeletingUser] = useState(false);

  // Fetch all users from Backend API + fallback demo users
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/admin/users", ADMIN_KEY_HEADER);
      const realUsers: AdminUserItem[] = (data || []).map((u: any) => ({
        user_id: String(u.user_id),
        display_name: u.display_name || "Hero User",
        avatar_url: u.avatar_url,
        coins: u.coins ?? 0,
        xp: u.xp ?? 0,
        level: u.level ?? 1,
        streak: u.streak ?? 0,
        created_at: u.created_at,
        is_demo: false,
      }));

      // Combine real users with demo users (deduplicating by name)
      const existingNames = new Set(realUsers.map((u) => u.display_name.toLowerCase()));
      const filteredDemoUsers = DEFAULT_DEMO_ADMIN_USERS.filter(
        (d) => !existingNames.has(d.display_name.toLowerCase())
      );

      setUsersList([...realUsers, ...filteredDemoUsers]);
    } catch (err) {
      console.error("Failed to load users from backend API:", err);
      toast({
        title: "Backend API Notice",
        description: "Showing sample admin user list.",
      });
      setUsersList(DEFAULT_DEMO_ADMIN_USERS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle Logout Admin
  const handleAdminLogout = () => {
    setAdminAuthenticated(false);
    toast({
      title: "Logged Out",
      description: "Admin session ended.",
    });
    navigate("/auth");
  };

  // Handle Coin Increase
  const handleIncreaseCoins = async () => {
    if (!selectedUserForCoins) return;
    const amountNum = parseInt(coinAddAmount, 10);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a positive number of coins to add.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdatingCoins(true);
    const targetUserId = selectedUserForCoins.user_id;
    const newCoins = selectedUserForCoins.coins + amountNum;

    try {
      if (!selectedUserForCoins.is_demo) {
        await api.put(`/admin/users/${targetUserId}/coins`, { coins: newCoins }, ADMIN_KEY_HEADER);
      }

      // Update state locally
      setUsersList((prev) =>
        prev.map((u) => (u.user_id === targetUserId ? { ...u, coins: newCoins } : u))
      );

      toast({
        title: "Coins Increased! 🪙",
        description: `Added +${amountNum.toLocaleString()} coins to ${selectedUserForCoins.display_name}. New Balance: ${newCoins.toLocaleString()} coins.`,
      });
      setSelectedUserForCoins(null);
    } catch (err: any) {
      console.error("Failed to update coins:", err);
      toast({
        title: "Error Updating Coins",
        description: err.response?.data?.error || err.message || "Failed to update user coins.",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingCoins(false);
    }
  };

  // Handle Remove User
  const handleRemoveUser = async () => {
    if (!userToDelete) return;
    setIsDeletingUser(true);
    const targetUserId = userToDelete.user_id;

    try {
      if (!userToDelete.is_demo) {
        await api.delete(`/admin/users/${targetUserId}`, ADMIN_KEY_HEADER);
      }

      // Update local state
      setUsersList((prev) => prev.filter((u) => u.user_id !== targetUserId));

      toast({
        title: "User Removed 🗑️",
        description: `User "${userToDelete.display_name}" has been removed.`,
      });
      setUserToDelete(null);
    } catch (err: any) {
      console.error("Failed to delete user:", err);
      toast({
        title: "Error Removing User",
        description: err.response?.data?.error || err.message || "Could not delete user record.",
        variant: "destructive",
      });
    } finally {
      setIsDeletingUser(false);
    }
  };

  // Filtering and sorting
  const filteredUsers = usersList
    .filter(
      (u) =>
        u.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.user_id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === "coins") comparison = a.coins - b.coins;
      else if (sortBy === "xp") comparison = a.xp - b.xp;
      else if (sortBy === "level") comparison = a.level - b.level;
      else comparison = a.display_name.localeCompare(b.display_name);

      return sortOrder === "desc" ? -comparison : comparison;
    });

  // Calculate System Summary Metrics
  const totalUsersCount = usersList.length;
  const totalCoinsInSystem = usersList.reduce((acc, u) => acc + u.coins, 0);
  const totalXPInSystem = usersList.reduce((acc, u) => acc + u.xp, 0);
  const avgLevel = totalUsersCount > 0 ? (usersList.reduce((acc, u) => acc + u.level, 0) / totalUsersCount).toFixed(1) : "0";

  // Data for Charts
  const topCoinsChartData = [...usersList]
    .sort((a, b) => b.coins - a.coins)
    .slice(0, 8)
    .map((u) => ({
      name: u.display_name,
      Coins: u.coins,
      XP: u.xp,
    }));

  const levelDistributionMap: { [key: string]: number } = {};
  usersList.forEach((u) => {
    const bucket = u.level <= 5 ? "Lvl 1-5" : u.level <= 15 ? "Lvl 6-15" : u.level <= 25 ? "Lvl 16-25" : "Lvl 25+";
    levelDistributionMap[bucket] = (levelDistributionMap[bucket] || 0) + 1;
  });

  const levelPieData = Object.keys(levelDistributionMap).map((key) => ({
    name: key,
    value: levelDistributionMap[key],
  }));

  return (
    <div className="min-h-screen bg-background text-foreground pb-12">
      {/* Admin Top Banner / Navbar */}
      <header className="border-b border-primary/20 bg-card/60 backdrop-blur-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/20 border border-primary/40 text-primary glow-primary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-black text-foreground tracking-wide">
                  Admin Command Center
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary text-primary-foreground">
                  ADMIN 👑
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Manage user accounts, coin distribution & analytics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/")}
              className="px-3 py-2 rounded-lg border border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to App
            </button>

            <button
              onClick={fetchUsers}
              disabled={loading}
              className="px-3 py-2 rounded-lg border border-primary/30 text-xs font-medium text-primary hover:bg-primary/10 transition-all flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
            </button>

            <button
              onClick={handleAdminLogout}
              className="px-3.5 py-2 rounded-lg bg-destructive/20 text-destructive border border-destructive/30 hover:bg-destructive/30 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* KPI Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="game-card border border-primary/30 bg-card/80 p-5 rounded-2xl relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Total Users
                </p>
                <h2 className="text-3xl font-black font-display text-foreground mt-1">
                  {totalUsersCount.toLocaleString()}
                </h2>
              </div>
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs text-muted-foreground gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Active learning accounts
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="game-card border border-amber-500/30 bg-card/80 p-5 rounded-2xl relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Total Coins Circulating
                </p>
                <h2 className="text-3xl font-black font-display text-amber-400 mt-1">
                  🪙 {totalCoinsInSystem.toLocaleString()}
                </h2>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                <Coins className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              Editable directly by Administrator
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="game-card border border-indigo-500/30 bg-card/80 p-5 rounded-2xl relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Total System XP
                </p>
                <h2 className="text-3xl font-black font-display text-indigo-400 mt-1">
                  ⭐ {totalXPInSystem.toLocaleString()}
                </h2>
              </div>
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400">
                <Trophy className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              Cumulative player experience
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="game-card border border-rose-500/30 bg-card/80 p-5 rounded-2xl relative overflow-hidden"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Average Level
                </p>
                <h2 className="text-3xl font-black font-display text-rose-400 mt-1">
                  Lvl {avgLevel}
                </h2>
              </div>
              <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400">
                <Flame className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              Average player progression
            </div>
          </motion.div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar Chart: User Coins & XP */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 game-card border border-border/80 bg-card p-6 rounded-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                <h3 className="font-display text-lg font-bold text-foreground">
                  User Economy & Progression Overview
                </h3>
              </div>
              <span className="text-xs text-muted-foreground">Top Users Breakdown</span>
            </div>

            <div className="h-[280px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topCoinsChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} />
                  <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(24, 24, 27, 0.9)",
                      borderColor: "rgba(161, 161, 170, 0.2)",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Coins" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="XP" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Pie Chart: Level Distribution */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="game-card border border-border/80 bg-card p-6 rounded-2xl space-y-4 flex flex-col justify-between"
          >
            <div className="flex items-center gap-2">
              <PieIcon className="w-5 h-5 text-amber-400" />
              <h3 className="font-display text-lg font-bold text-foreground">
                Player Level Distribution
              </h3>
            </div>

            <div className="h-[230px] w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={levelPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {levelPieData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(24, 24, 27, 0.9)",
                      borderColor: "rgba(161, 161, 170, 0.2)",
                      borderRadius: "12px",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* User Management Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="game-card border border-border/80 bg-card p-6 rounded-2xl space-y-6"
        >
          {/* Header + Search Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                User Accounts Management ({filteredUsers.length})
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                View user details, adjust coin balances, or manage access.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search input */}
              <div className="relative min-w-[220px]">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name or ID..."
                  className="w-full pl-9 pr-3 py-2 bg-secondary/80 border border-border/60 rounded-xl text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-1.5 bg-secondary/60 p-1 rounded-xl border border-border/60 text-xs">
                <span className="text-muted-foreground px-2">Sort:</span>
                {(["coins", "xp", "level", "name"] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      if (sortBy === key) {
                        setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
                      } else {
                        setSortBy(key);
                        setSortOrder("desc");
                      }
                    }}
                    className={`px-2.5 py-1 rounded-lg font-semibold capitalize transition-all ${
                      sortBy === key
                        ? "bg-primary text-primary-foreground shadow"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {key} {sortBy === key ? (sortOrder === "desc" ? "↓" : "↑") : ""}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* User Table */}
          <div className="overflow-x-auto rounded-xl border border-border/60 bg-secondary/20">
            <table className="w-full text-left text-xs">
              <thead className="bg-secondary/80 text-muted-foreground font-semibold uppercase tracking-wider border-b border-border/60">
                <tr>
                  <th className="py-3.5 px-4">User</th>
                  <th className="py-3.5 px-4">Level</th>
                  <th className="py-3.5 px-4">XP</th>
                  <th className="py-3.5 px-4">Streak</th>
                  <th className="py-3.5 px-4">Coins Balance</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 font-medium">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground text-sm">
                      No matching users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr
                      key={u.user_id}
                      className="hover:bg-secondary/40 transition-colors group"
                    >
                      {/* User details */}
                      <td className="py-3.5 px-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/20 text-primary border border-primary/30 flex items-center justify-center font-bold font-display text-sm">
                          {u.display_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-display font-bold text-sm text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5">
                            {u.display_name}
                            {u.is_demo && (
                              <span className="px-1.5 py-0.2 text-[10px] bg-secondary text-muted-foreground rounded border border-border">
                                Demo
                              </span>
                            )}
                          </p>
                          <p className="text-[11px] text-muted-foreground truncate max-w-[180px]">
                            ID: {u.user_id}
                          </p>
                        </div>
                      </td>

                      {/* Level */}
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                          Lvl {u.level}
                        </span>
                      </td>

                      {/* XP */}
                      <td className="py-3.5 px-4 text-indigo-300 font-semibold">
                        <span className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-indigo-400" />
                          {u.xp.toLocaleString()}
                        </span>
                      </td>

                      {/* Streak */}
                      <td className="py-3.5 px-4 text-amber-400 font-semibold">
                        <span className="flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 text-orange-400" />
                          {u.streak} Days
                        </span>
                      </td>

                      {/* Coins (Highlighted) */}
                      <td className="py-3.5 px-4">
                        <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 font-display font-bold text-sm inline-flex items-center gap-1.5 shadow-sm">
                          🪙 {u.coins.toLocaleString()}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedUserForCoins(u);
                              setCoinAddAmount("500");
                            }}
                            className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 font-bold text-xs transition-all flex items-center gap-1"
                            title="Increase Coins"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Coins</span>
                          </button>

                          <button
                            onClick={() => setUserToDelete(u)}
                            className="p-1.5 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive border border-destructive/30 transition-all"
                            title="Remove User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      {/* MODAL 1: Increase User Coins */}
      <AnimatePresence>
        {selectedUserForCoins && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="game-card w-full max-w-md border border-amber-500/40 bg-card p-6 shadow-2xl space-y-4"
            >
              <div className="flex justify-between items-center border-b border-border/40 pb-3">
                <div className="flex items-center gap-2 text-amber-400 font-display font-bold text-lg">
                  <Coins className="w-5 h-5 text-amber-400" />
                  <span>Increase Coins</span>
                </div>
                <button
                  onClick={() => setSelectedUserForCoins(null)}
                  className="text-muted-foreground hover:text-foreground text-sm p-1 rounded-md"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Target User Account:</p>
                <p className="text-base font-display font-bold text-foreground">
                  {selectedUserForCoins.display_name}{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    (Current Balance: 🪙 {selectedUserForCoins.coins.toLocaleString()})
                  </span>
                </p>
              </div>

              {/* Quick Preset Buttons */}
              <div>
                <label className="text-xs text-muted-foreground font-medium mb-1.5 block">
                  Quick Amount Presets
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {["100", "500", "1000", "5000"].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setCoinAddAmount(preset)}
                      className={`py-2 rounded-lg font-bold text-xs border transition-all ${
                        coinAddAmount === preset
                          ? "bg-amber-500 text-black border-amber-400 shadow-md shadow-amber-500/30"
                          : "border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      +{preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Input */}
              <div>
                <label className="text-xs text-muted-foreground font-medium mb-1.5 block">
                  Or enter custom coin amount to add
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400 font-bold">
                    🪙
                  </span>
                  <input
                    type="number"
                    value={coinAddAmount}
                    onChange={(e) => setCoinAddAmount(e.target.value)}
                    placeholder="e.g. 2500"
                    min="1"
                    className="w-full pl-9 pr-4 py-2.5 bg-secondary/80 border border-border/60 rounded-xl text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  onClick={() => setSelectedUserForCoins(null)}
                  className="flex-1 py-2.5 rounded-xl border border-border text-xs font-semibold text-muted-foreground hover:bg-secondary transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleIncreaseCoins}
                  disabled={isUpdatingCoins}
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  {isUpdatingCoins ? "Updating..." : "Add Coins Now"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: Remove User Confirm */}
      <AnimatePresence>
        {userToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="game-card w-full max-w-md border border-destructive/40 bg-card p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center gap-3 text-destructive font-display font-bold text-lg">
                <div className="p-2 rounded-xl bg-destructive/10 text-destructive">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <span>Confirm User Removal</span>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Are you sure you want to remove user{" "}
                <strong className="text-foreground">{userToDelete.display_name}</strong> (ID: {userToDelete.user_id})?
                This action will delete their profile and stats.
              </p>

              <div className="pt-3 flex gap-2">
                <button
                  onClick={() => setUserToDelete(null)}
                  className="flex-1 py-2.5 rounded-xl border border-border text-xs font-semibold text-muted-foreground hover:bg-secondary transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRemoveUser}
                  disabled={isDeletingUser}
                  className="flex-1 py-2.5 rounded-xl bg-destructive hover:bg-destructive/90 text-destructive-foreground text-xs font-bold transition-all shadow-lg shadow-destructive/20 disabled:opacity-50"
                >
                  {isDeletingUser ? "Deleting..." : "Yes, Remove User"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
