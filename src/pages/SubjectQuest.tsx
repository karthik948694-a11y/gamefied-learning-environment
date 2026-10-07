import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Lightbulb, CheckCircle2, XCircle, Coins, Star, BookOpen } from "lucide-react";
import QuestMap from "@/components/QuestMap";
import EnemyBattle from "@/components/EnemyBattle";
import BattleAnimation from "@/components/BattleAnimation";
import TheoryPanel from "@/components/TheoryPanel";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { subjects, type Chapter, type Question } from "@/lib/gameData";
import { useCostumes } from "@/contexts/CostumeContext";

type ViewMode = "map" | "theory" | "quiz";

const SubjectQuest = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const subject = subjects.find((s) => s.id === subjectId);

  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("map");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(null);
  const [score, setScore] = useState({ xp: 0, coins: 0, correct: 0 });
  const [battleResult, setBattleResult] = useState<"correct" | "wrong" | null>(null);
  const { play } = useSoundEffects();
  const { equipped } = useCostumes();
  const [retrying, setRetrying] = useState(false);

  // Wrong answer → send the learner back to the theory section automatically
  useEffect(() => {
    if (answeredCorrectly === false) {
      const t = setTimeout(() => {
        setRetrying(true);
        setViewMode("theory");
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [answeredCorrectly]);



  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Quest not found!</p>
      </div>
    );
  }

  const currentQuestion: Question | undefined =
    selectedChapter?.questions[currentQuestionIndex];

  const handleSelectChapter = (ch: Chapter) => {
    setSelectedChapter(ch);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnsweredCorrectly(null);
    setShowHint(false);
    setRetrying(false);
    setScore({ xp: 0, coins: 0, correct: 0 });
    setViewMode("theory"); // always show theory first
  };

  const handleStartQuiz = () => {
    // fresh attempt at the current question (also used when returning after a wrong answer)
    setSelectedAnswer(null);
    setAnsweredCorrectly(null);
    setShowHint(false);
    setViewMode("quiz");
  };

  const reviewTheory = () => {
    setRetrying(true);
    setViewMode("theory");
  };

  const handleCloseTheory = () => {
    setSelectedChapter(null);
    setViewMode("map");
  };

  const handleAnswer = (answerIndex: number) => {
    if (answeredCorrectly !== null) return;
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === currentQuestion?.correctAnswer;
    setAnsweredCorrectly(correct);
    setBattleResult(correct ? "correct" : "wrong");
    play(correct ? "correct" : "wrong");
    if (correct && currentQuestion) {
      setScore((s) => ({
        xp: s.xp + currentQuestion.xpReward,
        coins: s.coins + currentQuestion.coinReward,
        correct: s.correct + 1,
      }));
    }
  };

  const nextQuestion = () => {
    if (selectedChapter && currentQuestionIndex < selectedChapter.questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
      setSelectedAnswer(null);
      setAnsweredCorrectly(null);
      setShowHint(false);
      setRetrying(false);
    } else {
      setSelectedChapter(null);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setAnsweredCorrectly(null);
      setShowHint(false);
      setViewMode("map");
    }
  };

  const completedChapters = subject.chapters.filter((c) => c.isCompleted).length;
  const totalChapters = subject.chapters.length;
  const enemyHealth = Math.max(0, 100 - (completedChapters / totalChapters) * 100);

  return (
    <div className="min-h-screen">
      <BattleAnimation
        result={battleResult}
        onComplete={() => setBattleResult(null)}
        equipped={equipped}
        enemyLevel={Math.max(1, completedChapters + 1)}
      />
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{subject.icon}</span>
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground">
                {subject.name}
              </h1>
              <p className="text-sm text-muted-foreground">{subject.description}</p>
            </div>
          </div>
        </motion.div>

        <div className={`grid grid-cols-1 gap-8 ${viewMode === "theory" ? "" : "lg:grid-cols-3"}`}>
          {/* Quest Map — hidden while learning so only lesson content shows */}
          {viewMode !== "theory" && (
            <div className="lg:col-span-1">
              <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
                🗺️ Quest Map
              </h3>
              <QuestMap
                chapters={subject.chapters}
                onSelectChapter={handleSelectChapter}
              />
            </div>
          )}

          {/* Main Content */}
          <div className={viewMode === "theory" ? "max-w-3xl mx-auto w-full" : "lg:col-span-2"}>

            <AnimatePresence mode="wait">
              {/* ── THEORY VIEW ── */}
              {viewMode === "theory" && selectedChapter && (
                <motion.div
                  key="theory"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <TheoryPanel
                    retrying={retrying}
                    chapterId={selectedChapter.id}
                    chapterName={selectedChapter.name}
                    onClose={handleCloseTheory}
                    onStartQuiz={handleStartQuiz}
                  />
                </motion.div>
              )}

              {/* ── QUIZ VIEW ── */}
              {viewMode === "quiz" && selectedChapter && currentQuestion && (
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {/* Chapter & Question Info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setViewMode("theory")}
                        className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                        title="Back to theory"
                      >
                        <BookOpen className="w-4 h-4" />
                      </button>
                      <h3 className="font-display font-bold text-lg">
                        {selectedChapter.name}
                      </h3>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Question {currentQuestionIndex + 1}/{selectedChapter.questions.length}
                    </span>
                  </div>

                  {/* Score Bar */}
                  <div className="flex gap-4 mb-6">
                    <div className="flex items-center gap-1 text-sm text-xp">
                      <Star className="w-4 h-4" />
                      <span className="font-bold">{score.xp} XP</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-coin">
                      <Coins className="w-4 h-4" />
                      <span className="font-bold">{score.coins}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-xp">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="font-bold">{score.correct} correct</span>
                    </div>
                  </div>

                  {/* Question Card */}
                  <div className="game-card border border-primary/30 mb-6">
                    <p className="text-lg font-body font-medium mb-6">
                      {currentQuestion.text}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {currentQuestion.options.map((option, i) => {
                        let style = "bg-secondary hover:bg-secondary/80 border-border";
                        if (answeredCorrectly !== null) {
                          if (i === currentQuestion.correctAnswer) {
                            style = "bg-xp/20 border-xp text-xp";
                          } else if (i === selectedAnswer && !answeredCorrectly) {
                            style = "bg-enemy/20 border-enemy text-enemy";
                          }
                        }
                        return (
                          <motion.button
                            key={i}
                            whileHover={answeredCorrectly === null ? { scale: 1.02 } : {}}
                            whileTap={answeredCorrectly === null ? { scale: 0.98 } : {}}
                            onClick={() => handleAnswer(i)}
                            className={`p-4 rounded-lg border text-left transition-all font-body ${style}`}
                          >
                            <span className="text-xs text-muted-foreground mr-2">
                              {String.fromCharCode(65 + i)}.
                            </span>
                            {option}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Feedback */}
                  <AnimatePresence>
                    {answeredCorrectly !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`game-card mb-4 flex items-center gap-3 ${
                          answeredCorrectly
                            ? "border border-xp/40"
                            : "border border-enemy/40"
                        }`}
                      >
                        {answeredCorrectly ? (
                          <>
                            <CheckCircle2 className="w-6 h-6 text-xp shrink-0" />
                            <div>
                              <p className="font-bold text-xp">Correct! 🎉</p>
                              <p className="text-sm text-muted-foreground">
                                +{currentQuestion.xpReward} XP, +{currentQuestion.coinReward} coins
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-6 h-6 text-enemy shrink-0" />
                            <div>
                              <p className="font-bold text-enemy">Not quite!</p>
                              <p className="text-sm text-muted-foreground">
                                The correct answer was: {currentQuestion.options[currentQuestion.correctAnswer]}
                              </p>
                              <p className="text-xs text-accent mt-1">
                                📖 Back to the theory — review it, then retry this question.
                              </p>
                            </div>
                          </>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={answeredCorrectly ? nextQuestion : reviewTheory}
                          className="ml-auto bg-primary text-primary-foreground px-4 py-2 rounded-lg font-display font-bold text-sm shrink-0"
                        >
                          {!answeredCorrectly
                            ? "Review Theory 📖"
                            : currentQuestionIndex < selectedChapter.questions.length - 1
                            ? "Next →"
                            : "Finish ✓"}
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Hint */}
                  {answeredCorrectly === null && (
                    <button
                      onClick={() => setShowHint(!showHint)}
                      className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
                    >
                      <Lightbulb className="w-4 h-4" />
                      {showHint ? "Hide hint" : "Need a hint?"}
                    </button>
                  )}
                  {showHint && answeredCorrectly === null && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 text-sm text-accent bg-accent/10 p-3 rounded-lg border border-accent/20"
                    >
                      💡 {currentQuestion.hint}
                    </motion.p>
                  )}
                </motion.div>
              )}

              {/* ── MAP / ENEMY VIEW ── */}
              {viewMode === "map" && (
                <motion.div
                  key="enemy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-6"
                >
                  <h3 className="font-display font-bold text-xl text-center">
                    ⚔️ Current Enemy
                  </h3>
                  <EnemyBattle
                    name={subject.enemyName}
                    level={Math.max(1, completedChapters + 1)}
                    healthPercent={enemyHealth}
                    defeated={enemyHealth <= 0}
                  />
                  <p className="text-center text-muted-foreground text-sm max-w-md">
                    Select a chapter from the Quest Map to read theory & battle questions to defeat the{" "}
                    <span className="text-enemy font-bold">{subject.enemyName}</span>!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectQuest;
