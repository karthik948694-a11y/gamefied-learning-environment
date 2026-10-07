import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Shield, Lock, User, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import defaultCharacter from "@/assets/default-character.png";
import { setAdminAuthenticated, validateAdminCredentials } from "@/lib/adminAuth";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Admin modal state
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAdminCredentials(adminUsername, adminPassword)) {
      setAdminAuthenticated(true);
      toast({
        title: "Welcome Admin 👑",
        description: "Access granted to Admin Dashboard.",
      });
      setShowAdminModal(false);
      navigate("/admin");
    } else {
      toast({
        title: "Access Denied ❌",
        description: "Invalid admin name or password.",
        variant: "destructive",
      });
    }
  };

  const toEmail = (name: string) => `${name.toLowerCase().replace(/\s+/g, "_")}@menorah.app`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      toast({ title: "Enter your hero name", variant: "destructive" });
      return;
    }
    setLoading(true);

    const email = toEmail(username);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        const desc = error.message === 'Invalid credentials'
          ? 'Invalid hero name or password. If you haven\'t created an account yet, click "Sign Up" tab first!'
          : error.message || 'Wrong name or password';
        toast({ title: 'Login failed', description: desc, variant: 'destructive' });
      } else {
        navigate('/choose');
      }
    } else {
      const { error, isDemo } = await signUp(email, password, username);
      if (error) {
        if (error.message?.includes("already registered")) {
          toast({ title: "Name taken", description: "Choose a different hero name", variant: "destructive" });
        } else {
          toast({ title: "Signup failed", description: error.message, variant: "destructive" });
        }
      } else {
        if (isDemo) {
          toast({ title: "🎉 Demo Bonus!", description: "You received 10,000 free coins!" });
        } else {
          toast({ title: "Account created!", description: "Welcome to Menorah!" });
        }
        navigate("/choose");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/8" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/8 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[150px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Character + Logo */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
            className="inline-block mb-4"
          >
            <div className="w-28 h-28 mx-auto rounded-2xl overflow-hidden border-2 border-primary/40 glow-primary bg-card shadow-2xl">
              <img src={defaultCharacter} alt="Hero" className="w-full h-full object-cover object-top" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display text-4xl font-black text-primary text-glow-primary"
          >
            Menorah
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground mt-1 text-sm"
          >
            {isLogin ? "Welcome back, hero!" : "Begin your learning adventure"}
          </motion.p>
        </div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="game-card border border-primary/20 backdrop-blur-sm"
        >
          {/* Tab Toggle */}
          <div className="flex mb-6 bg-secondary/80 rounded-xl p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-lg font-display font-bold text-sm transition-all duration-300 ${
                isLogin ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <User className="w-4 h-4 inline mr-1.5" /> Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-lg font-display font-bold text-sm transition-all duration-300 ${
                !isLogin ? "bg-accent text-accent-foreground shadow-lg shadow-accent/30" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Shield className="w-4 h-4 inline mr-1.5" /> Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground font-medium mb-1.5 block">Hero Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your hero name"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-secondary/60 border border-border/60 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-4 py-3 bg-secondary/60 border border-border/60 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 rounded-xl font-display font-bold text-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isLogin ? (
                <>⚔️ Enter the Quest</>
              ) : (
                <>🛡️ Create Account</>
              )}
            </motion.button>
          </form>

          {/* Admin Login Link at the bottom side */}
          <div className="mt-4 pt-3 border-t border-border/40 flex justify-end">
            <button
              type="button"
              onClick={() => setShowAdminModal(true)}
              className="text-xs text-muted-foreground/70 hover:text-primary transition-colors flex items-center gap-1.5 px-2 py-1 rounded hover:bg-secondary/50 font-medium"
            >
              <Shield className="w-3.5 h-3.5 text-primary/60" />
              <span>Admin Login</span>
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showAdminModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="game-card w-full max-w-sm border border-primary/40 bg-card p-6 shadow-2xl relative"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-primary font-display font-bold text-lg">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>Admin Access</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAdminModal(false)}
                  className="text-muted-foreground hover:text-foreground text-sm p-1 rounded-md hover:bg-secondary"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Restricted area. Please sign in with administrator credentials.
              </p>

              <form onSubmit={handleAdminSubmit} className="space-y-3.5">
                <div>
                  <label className="text-xs text-muted-foreground font-medium mb-1 block">Admin Username</label>
                  <input
                    type="text"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    placeholder="Enter admin username"
                    required
                    className="w-full px-3 py-2.5 bg-secondary/80 border border-border/60 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground font-medium mb-1 block">Admin Password</label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-3 py-2.5 bg-secondary/80 border border-border/60 rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAdminModal(false)}
                    className="flex-1 py-2.5 rounded-lg border border-border text-xs font-semibold text-muted-foreground hover:bg-secondary transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20"
                  >
                    Access Dashboard
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Auth;
