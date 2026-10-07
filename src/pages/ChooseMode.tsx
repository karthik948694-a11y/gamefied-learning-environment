import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, Swords } from "lucide-react";

const ChooseMode = () => {
  const navigate = useNavigate();

  const cards = [
    {
      id: "kids",
      title: "Kids Zone",
      emoji: "🧸",
      description: "ABC, numbers, shapes, math and science — playful and gentle for little learners.",
      cta: "Enter Kids Zone",
      icon: Sparkles,
      onClick: () => navigate("/kids"),
      className: "bg-card border-accent/40 hover:border-accent",
      accent: "text-accent",
    },
    {
      id: "adult",
      title: "Hero Quest",
      emoji: "⚔️",
      description: "Python, English and Aptitude battles with XP, streaks, costumes and leaderboards.",
      cta: "Continue Quest",
      icon: Swords,
      onClick: () => navigate("/"),
      className: "bg-card border-primary/40 hover:border-primary",
      accent: "text-primary",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <span className="text-4xl">🕎</span>
        <h1 className="font-display text-3xl md:text-4xl font-black text-primary text-glow-primary mt-2">
          Choose Your World
        </h1>
        <p className="text-muted-foreground mt-2">Pick the experience that fits the learner.</p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 w-full max-w-3xl">
        {cards.map((c, i) => (
          <motion.button
            key={c.id}
            onClick={c.onClick}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className={`game-card text-left border-2 transition-colors ${c.className} p-6`}
          >
            <span className="text-5xl">{c.emoji}</span>
            <h2 className={`font-display text-2xl font-bold mt-3 ${c.accent}`}>{c.title}</h2>
            <p className="text-sm text-muted-foreground mt-2 mb-5">{c.description}</p>
            <span className={`inline-flex items-center gap-2 font-display font-bold ${c.accent}`}>
              <c.icon className="w-4 h-4" /> {c.cta}
            </span>
          </motion.button>
        ))}
      </div>
    </main>
  );
};

export default ChooseMode;
