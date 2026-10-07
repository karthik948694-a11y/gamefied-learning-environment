import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import {
  kidsTopics,
  getKidsStars,
  getKidsAge,
  saveKidsAge,
  getDifficulty,
  MIN_AGE,
  MAX_AGE,
} from "@/lib/kidsData";
import AnimalGuide from "@/components/kids/AnimalGuide";
import AnimalGuideRow from "@/components/kids/AnimalGuideRow";
import { animalGuides } from "@/lib/animalGuides";
import { getForestStats } from "@/lib/kidsForest";

const toneClass: Record<string, string> = {
  sky: "kid-tile-sky",
  peach: "kid-tile-peach",
  mint: "kid-tile-mint",
  lilac: "kid-tile-lilac",
  sun: "kid-tile-sun",
};

const ASK_KEY = "kids-age-asked";

const KidsHome = () => {
  const navigate = useNavigate();
  const stars = getKidsStars();
  const forest = getForestStats();
  const [age, setAge] = useState(getKidsAge());
  const [asking, setAsking] = useState(() => sessionStorage.getItem(ASK_KEY) !== "1");
  const difficulty = getDifficulty(age);

  const pickAge = (a: number) => {
    setAge(a);
    saveKidsAge(a);
    sessionStorage.setItem(ASK_KEY, "1");
    setAsking(false);
  };

  return (
    <main className="kids-theme min-h-screen bg-background text-foreground">
      <AnimatePresence>
        {asking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
              className="kid-tile kid-tile-sun rounded-3xl px-6 py-7 text-center max-w-lg w-full"
            >
              <AnimalGuide animal="lion" mood="greet" message="Hello! How old are you?" size="md" showName={false} />
              <h2 className="font-display text-2xl font-black text-primary mt-4">Pick your age</h2>
              <p className="text-sm text-muted-foreground mt-1">
                We'll choose the perfect level of questions for you.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
                {Array.from({ length: MAX_AGE - MIN_AGE + 1 }, (_, i) => MIN_AGE + i).map((a) => (
                  <motion.button
                    key={a}
                    onClick={() => pickAge(a)}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                    className="w-14 h-14 rounded-full font-display text-xl font-black bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {a}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="container mx-auto px-4 pt-6 flex items-center justify-between">
        <button
          onClick={() => navigate("/choose")}
          className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          onClick={() => setAsking(true)}
          className="text-sm font-bold text-muted-foreground hover:text-foreground"
        >
          Age {age} · {difficulty.emoji} {difficulty.label} — change
        </button>
      </header>


      <section className="container mx-auto px-4 py-8 text-center">
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl md:text-4xl font-black text-primary mt-2">
            Let's Learn & Play!
          </h1>
          <p className="text-muted-foreground mt-2">Tap a card to see pictures and learn, then play the quiz.</p>
        </motion.div>

        <div className="mt-6">
          <AnimalGuide animal="lion" mood="greet" size="lg" />
        </div>
      </section>


      {/* Montessori Workshop Highlight */}
      <section className="container mx-auto px-4 pb-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            to="/kids/montessori"
            className="kid-tile kid-tile-lilac block rounded-3xl p-6 text-center border-2 border-primary/40 shadow-lg"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl">🧮</span>
              <span className="text-4xl">🔤</span>
              <span className="text-4xl">🗼</span>
            </div>
            <h2 className="font-display text-2xl font-black mt-3 text-foreground">
              ✨ Montessori Sensory Workshop
            </h2>
            <p className="text-sm font-semibold text-muted-foreground mt-1">
              Learn by touch & discovery! Bead stairs, movable alphabet & pink tower stacking.
            </p>
            <span className="inline-block mt-3 bg-primary text-primary-foreground px-5 py-2 rounded-xl font-display text-sm font-bold shadow">
              Open Workshop →
            </span>
          </Link>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          {kidsTopics.map((topic, i) => (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to={`/kids/${topic.id}`}
                className={`kid-tile ${toneClass[topic.tone]} block rounded-3xl p-6 text-center`}
              >
                <motion.span
                  className="text-7xl block leading-none"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.15 }}
                  aria-hidden="true"
                >
                  {animalGuides[topic.guide].emoji}
                </motion.span>
                <h2 className="font-display text-xl font-bold mt-3 text-foreground">{topic.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">{topic.tagline}</p>
                <p className="text-xs font-bold text-muted-foreground mt-2">
                  Guided by {animalGuides[topic.guide].name} · {animalGuides[topic.guide].title}
                </p>
                <p className="text-xs font-bold text-primary mt-1">📖 Learn with pictures → 🎯 Quiz</p>

                <div className="flex items-center justify-center gap-1 mt-3">
                  {[1, 2, 3].map((s) => (
                    <Star
                      key={s}
                      className={`w-5 h-5 ${
                        (stars[topic.id] ?? 0) >= s
                          ? "fill-coin text-coin"
                          : "text-muted-foreground/40"
                      }`}
                    />
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="max-w-4xl mx-auto"
        >
          <Link to="/kids/forest" className="kid-tile kid-tile-mint block rounded-3xl p-6 text-center">
            <div className="flex items-end justify-center gap-1">
              {["\ud83c\udf33", "\ud83c\udf32", "\ud83c\udf34", "\ud83c\udf31"].map((t, i) => (
                <motion.span
                  key={i}
                  className="text-4xl"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.2 }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
            <h2 className="font-display text-xl font-bold mt-3 text-foreground">My Forest</h2>
            <p className="text-sm text-muted-foreground mt-1">
              You have grown {forest.total} {forest.total === 1 ? "tree" : "trees"} — tap to visit your forest!
            </p>
            <p className="text-xs font-bold text-muted-foreground mt-2">
              1 minute of learning = 1 tree \u00b7 3 correct answers = 1 tree
            </p>
          </Link>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <h2 className="font-display text-xl font-bold text-center text-foreground mb-5">
          Meet your animal friends
        </h2>
        <AnimalGuideRow />
      </section>
    </main>
  );
};

export default KidsHome;
