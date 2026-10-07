import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Volume2 } from "lucide-react";
import { getKidsTopic } from "@/lib/kidsData";
import { getKidsLesson } from "@/lib/kidsLessons";
import AnimalGuide from "@/components/kids/AnimalGuide";
import { animalGuides } from "@/lib/animalGuides";

const toneClass: Record<string, string> = {
  sky: "kid-tile-sky",
  peach: "kid-tile-peach",
  mint: "kid-tile-mint",
  lilac: "kid-tile-lilac",
  sun: "kid-tile-sun",
};

const KidsLesson = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const topic = getKidsTopic(topicId);
  const cards = getKidsLesson(topicId);
  const [i, setI] = useState(0);

  if (!topic || cards.length === 0) {
    return (
      <main className="kids-theme min-h-screen bg-background text-foreground flex items-center justify-center">
        <button onClick={() => navigate("/kids")} className="kid-btn">Back to Kids Zone</button>
      </main>
    );
  }

  const card = cards[i];
  const last = i === cards.length - 1;

  const speak = () => {
    try {
      const u = new SpeechSynthesisUtterance(`${card.title}. ${card.caption}`);
      u.rate = 0.85;
      u.pitch = 1.2;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch {
      /* speech not supported */
    }
  };

  return (
    <main className="kids-theme min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 pt-6 flex items-center justify-between">
        <button
          onClick={() => navigate("/kids")}
          className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" /> Kids Zone
        </button>
        <span className="text-sm font-bold text-muted-foreground">
          {topic.emoji} Learn {topic.name}
        </span>
      </header>

      <section className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center justify-center gap-2 mb-6">
          {cards.map((_, n) => (
            <span
              key={n}
              className={`h-3 rounded-full transition-all ${
                n === i ? "w-8 bg-primary" : "w-3 bg-secondary"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 60, rotate: 2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -60, rotate: -2 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className={`kid-tile ${toneClass[topic.tone]} rounded-3xl p-8 text-center`}
          >
            <motion.div
              className="text-7xl sm:text-8xl leading-tight"
              animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            >
              {card.visual}
            </motion.div>

            <h1 className="font-display text-4xl font-black text-primary mt-4">{card.title}</h1>
            <p className="font-body text-lg font-semibold text-foreground mt-2">{card.caption}</p>

            {card.strip && (
              <div className="flex items-center justify-center gap-4 mt-5">
                {card.strip.map((s, n) => (
                  <motion.span
                    key={n}
                    className="text-4xl"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: n * 0.25 }}
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            )}

            <button
              onClick={speak}
              className="kid-btn mt-6 inline-flex items-center gap-2 text-base"
              aria-label="Listen to this lesson"
            >
              <Volume2 className="w-5 h-5" /> Listen
            </button>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6">
          <AnimalGuide
            animal={topic.guide}
            mood={last ? "celebrate" : "hint"}
            seed={i}
            size="sm"
            showName={false}
          />
        </div>

        <div className="flex items-center justify-between gap-3 mt-7">
          <button
            onClick={() => setI((n) => Math.max(0, n - 1))}
            disabled={i === 0}
            className="kid-btn inline-flex items-center gap-1 disabled:opacity-40"
          >
            <ChevronLeft className="w-5 h-5" /> Back
          </button>

          {!last ? (
            <button
              onClick={() => setI((n) => n + 1)}
              className="kid-btn inline-flex items-center gap-1"
            >
              Next <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button onClick={() => navigate(`/kids/${topic.id}/play`)} className="kid-btn">
              {animalGuides[topic.guide].emoji} Start Quiz
            </button>
          )}
        </div>

        <p className="text-center text-xs font-bold text-muted-foreground mt-5">
          Picture {i + 1} of {cards.length}
        </p>
      </section>
    </main>
  );
};

export default KidsLesson;
