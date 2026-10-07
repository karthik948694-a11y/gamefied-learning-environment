import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import { getKidsTopic, saveKidsStars, getKidsAge, getDifficulty, getQuestionsForAge } from "@/lib/kidsData";
import AnimalGuide from "@/components/kids/AnimalGuide";
import { animalGuides, getGuideMessage } from "@/lib/animalGuides";
import { addForestCorrect, addForestSeconds } from "@/lib/kidsForest";

const KidsActivity = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const topic = getKidsTopic(topicId);
  const age = getKidsAge();
  const difficulty = getDifficulty(age);
  const questions = useMemo(() => (topic ? getQuestionsForAge(topic, age) : []), [topic, age]);

  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [celebrating, setCelebrating] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const startedAt = useRef(Date.now());

  // credit learning time to the forest (1 minute = 1 tree)
  useEffect(() => {
    const flush = () => {
      addForestSeconds((Date.now() - startedAt.current) / 1000);
      startedAt.current = Date.now();
    };
    const id = window.setInterval(flush, 15000);
    return () => {
      window.clearInterval(id);
      flush();
    };
  }, []);

  if (!topic) {
    return (
      <main className="kids-theme min-h-screen bg-background text-foreground flex items-center justify-center">
        <button onClick={() => navigate("/kids")} className="kid-btn">Back to Kids Zone</button>
      </main>
    );
  }

  const question = questions[index];
  const total = questions.length;

  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    const correct = i === question.correctAnswer;
    if (correct) {
      setScore((s) => s + 1);
      setCelebrating(true);
      addForestCorrect(1);
    }

    setTimeout(() => {
      setCelebrating(false);
      if (index + 1 >= total) {
        const finalScore = correct ? score + 1 : score;
        const stars = finalScore >= total - 1 ? 3 : finalScore >= total * 0.6 ? 2 : 1;
        saveKidsStars(topic.id, stars);
        setDone(true);
      } else {
        setIndex((n) => n + 1);
        setPicked(null);
      }
    }, correct ? 3000 : 1100);
  };

  const restart = () => {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setDone(false);
    setCelebrating(false);
  };

  const stars = score >= total - 1 ? 3 : score >= total * 0.6 ? 2 : 1;

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
          {animalGuides[topic.guide].emoji} {topic.name} · {difficulty.emoji} {difficulty.label} (age {age})
        </span>
      </header>

      <section className="container mx-auto px-4 py-8 max-w-2xl">
        {!done ? (
          <>
            <div className="h-4 rounded-full bg-secondary overflow-hidden mb-8">
              <motion.div
                className="h-full bg-primary rounded-full"
                animate={{ width: `${((index + 1) / total) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={question.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                className="kid-tile kid-tile-sky rounded-3xl p-6 text-center"
              >
                {question.visual && (
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {question.visual}
                  </motion.div>
                )}
                <h1 className="font-display text-2xl font-bold text-foreground">{question.prompt}</h1>

                <div className={`grid gap-4 mt-6 ${question.options.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                  {question.options.map((opt, i) => {
                    const isCorrect = i === question.correctAnswer;
                    const state =
                      picked === null
                        ? ""
                        : isCorrect
                        ? "kid-btn-correct"
                        : picked === i
                        ? "kid-btn-wrong"
                        : "opacity-50";
                    return (
                      <motion.button
                        key={i}
                        onClick={() => choose(i)}
                        whileHover={{ scale: picked === null ? 1.04 : 1 }}
                        whileTap={{ scale: 0.96 }}
                        className={`kid-btn ${state}`}
                      >
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="mt-6">
                  <AnimalGuide
                    animal={topic.guide}
                    mood={picked === null ? "hint" : picked === question.correctAnswer ? "correct" : "wrong"}
                    seed={index}
                    size="sm"
                    showName={false}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence>
              {celebrating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm pointer-events-none"
                >
                  {[...Array(14)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute text-3xl"
                      initial={{ opacity: 0, y: 40, x: 0, scale: 0.5 }}
                      animate={{
                        opacity: [0, 1, 1, 0],
                        y: [40, -160 - (i % 5) * 30],
                        x: (i - 7) * 34,
                        rotate: (i % 2 ? 1 : -1) * 180,
                        scale: 1,
                      }}
                      transition={{ duration: 2.4, delay: (i % 7) * 0.08, ease: "easeOut" }}
                    >
                      {["\u2b50", "\ud83c\udf89", "\u2728", "\ud83c\udf88"][i % 4]}
                    </motion.span>
                  ))}

                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 240, damping: 16 }}
                    className="kid-tile kid-tile-mint rounded-3xl px-8 py-7 text-center"
                  >
                    <motion.span
                      className="text-7xl block"
                      animate={{ y: [0, -16, 0], rotate: [0, -8, 8, 0] }}
                      transition={{ duration: 1, repeat: 2 }}
                    >
                      {animalGuides[topic.guide].emoji}
                    </motion.span>
                    <h2 className="font-display text-3xl font-black text-primary mt-3">Correct!</h2>
                    <p className="font-body font-semibold text-foreground mt-1">
                      {getGuideMessage(topic.guide, "correct", index)}
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="kid-tile kid-tile-sun rounded-3xl p-8 text-center"
          >
            <span className="text-6xl">🏆</span>
            <h1 className="font-display text-3xl font-black text-foreground mt-3">All done!</h1>
            <p className="text-muted-foreground mt-2">
              You got {score} out of {total} right.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              {[1, 2, 3].map((s) => (
                <motion.div key={s} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: s * 0.15 }}>
                  <Star className={`w-10 h-10 ${stars >= s ? "fill-coin text-coin" : "text-muted-foreground/40"}`} />
                </motion.div>
              ))}
            </div>
            <div className="mt-6">
              <AnimalGuide animal={topic.guide} mood="celebrate" seed={score} size="md" />
            </div>
            <div className="flex flex-wrap gap-3 justify-center mt-7">
              <button onClick={() => navigate(`/kids/${topic.id}`)} className="kid-btn">📖 Learn Again</button>
              <button onClick={restart} className="kid-btn">Play Again</button>
              <button onClick={() => navigate("/kids")} className="kid-btn">More Activities</button>
            </div>

          </motion.div>
        )}
      </section>
    </main>
  );
};

export default KidsActivity;
