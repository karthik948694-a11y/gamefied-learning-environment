import { useState } from "react";
import { motion } from "framer-motion";
import SubjectCard from "@/components/SubjectCard";
import { subjects, subjectCategories } from "@/lib/gameData";
import { useUserStats } from "@/hooks/useUserStats";
import heroBanner from "@/assets/hero-banner.jpg";

const Index = () => {
  const { profile } = useUserStats();
  const [activeCategory, setActiveCategory] = useState("all");

  const category = subjectCategories.find((c) => c.id === activeCategory) ?? subjectCategories[0];
  const visibleSubjects = category.subjectIds
    .map((id) => subjects.find((s) => s.id === id))
    .filter((s): s is (typeof subjects)[number] => Boolean(s));

  const totalProgress = Math.round(
    (subjects.reduce((a, s) => a + s.completedQuestions, 0) /
      subjects.reduce((a, s) => a + s.totalQuestions, 0)) *
      100
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBanner}
            alt="Quest banner"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        <div className="relative container mx-auto px-4 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-4xl md:text-5xl font-black text-primary text-glow-primary mb-3">
              Your Quest Awaits, Hero!
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-6">
              Defeat enemies. Unlock treasures. Master knowledge. Choose your next quest, {profile?.display_name ?? "Hero"}!
            </p>
          </motion.div>

          {/* Overall Progress */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-4 game-card px-6 py-3"
          >
            <span className="text-muted-foreground text-sm">Overall Quest Progress</span>
            <div className="w-40 h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className="progress-bar-fill bg-primary"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
            <span className="font-display font-bold text-primary">{totalProgress}%</span>
          </motion.div>
        </div>
      </section>

      {/* Subject Quests */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">🗺️</span> Choose Your Quest
        </h2>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-2">
          {subjectCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg border font-display text-sm transition-all ${
                cat.id === activeCategory
                  ? "border-primary bg-primary/15 text-primary glow-primary"
                  : "border-border bg-secondary/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              <span className="mr-1">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mb-6">{category.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleSubjects.map((subject, i) => (
            <SubjectCard key={`${category.id}-${subject.id}`} subject={subject} index={i} />
          ))}
        </div>
      </section>


      {/* Weekly Assignments Teaser */}
      <section className="container mx-auto px-4 py-8">
        <motion.div
          className="game-card border border-accent/30 text-center py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="text-4xl mb-3 block">📜</span>
          <h3 className="font-display text-xl font-bold text-accent text-glow-accent mb-2">
            Weekly Challenge Available!
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            Complete this week's special assignment to earn 200 bonus coins & 500 XP
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-accent text-accent-foreground px-6 py-2 rounded-lg font-display font-bold hover:opacity-90 transition-opacity"
          >
            Accept Challenge
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
