import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, CheckCircle2 } from "lucide-react";
import { getForestStats, TREE_KINDS } from "@/lib/kidsForest";
import AnimalGuide from "@/components/kids/AnimalGuide";

const KidsForest = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(() => getForestStats());

  useEffect(() => {
    const refresh = () => setStats(getForestStats());
    window.addEventListener("kids-forest-updated", refresh);
    return () => window.removeEventListener("kids-forest-updated", refresh);
  }, []);

  const trees = useMemo(
    () =>
      Array.from({ length: stats.total }, (_, i) => ({
        emoji: TREE_KINDS[i % TREE_KINDS.length],
        size: 1 + ((i * 7) % 5) * 0.12,
        offset: ((i * 13) % 7) - 3,
      })),
    [stats.total]
  );

  const minutes = Math.floor(stats.seconds / 60);

  return (
    <main className="kids-theme min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 pt-6 flex items-center justify-between">
        <button
          onClick={() => navigate("/kids")}
          className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" /> Kids Zone
        </button>
        <span className="text-sm font-bold text-muted-foreground">🌳 My Forest</span>
      </header>

      <section className="container mx-auto px-4 py-8 text-center max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl md:text-4xl font-black text-primary"
        >
          My Growing Forest
        </motion.h1>
        <p className="text-muted-foreground mt-2">
          Every minute of learning plants a tree, and every 3 correct answers plants one more.
        </p>

        <div className="grid gap-4 sm:grid-cols-3 mt-6">
          <div className="kid-tile kid-tile-mint rounded-3xl p-5">
            <span className="text-4xl block">🌳</span>
            <p className="font-display text-2xl font-black text-foreground mt-1">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Trees grown</p>
          </div>
          <div className="kid-tile kid-tile-sky rounded-3xl p-5">
            <Clock className="w-8 h-8 mx-auto text-foreground" />
            <p className="font-display text-2xl font-black text-foreground mt-1">{minutes} min</p>
            <p className="text-sm text-muted-foreground">{stats.timeTrees} trees from time</p>
          </div>
          <div className="kid-tile kid-tile-sun rounded-3xl p-5">
            <CheckCircle2 className="w-8 h-8 mx-auto text-foreground" />
            <p className="font-display text-2xl font-black text-foreground mt-1">{stats.correct}</p>
            <p className="text-sm text-muted-foreground">{stats.answerTrees} trees from answers</p>
          </div>
        </div>

        <div className="kid-tile kid-tile-mint rounded-3xl p-6 mt-6 min-h-[220px] flex items-end justify-center flex-wrap gap-x-1 gap-y-3">
          {trees.length === 0 ? (
            <div className="w-full text-center py-8">
              <span className="text-6xl block">🌱</span>
              <p className="font-body font-semibold text-foreground mt-3">
                Your forest is empty. Play an activity to plant your first tree!
              </p>
            </div>
          ) : (
            trees.map((t, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: t.size, y: t.offset }}
                transition={{ delay: Math.min(i * 0.04, 1.5), type: "spring", stiffness: 200, damping: 14 }}
                className="text-4xl inline-block origin-bottom"
              >
                {t.emoji}
              </motion.span>
            ))
          )}
        </div>

        <p className="text-sm text-muted-foreground mt-4">
          Next tree in {stats.secondsToNextTree}s of learning or {stats.correctToNextTree} more correct answers.
        </p>

        <div className="mt-7">
          <AnimalGuide animal="elephant" mood="greet" message="Look how big your forest is growing!" size="md" />
        </div>

        <button onClick={() => navigate("/kids")} className="kid-btn mt-7">
          Grow more trees
        </button>
      </section>
    </main>
  );
};

export default KidsForest;
