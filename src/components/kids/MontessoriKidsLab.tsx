import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Volume2, CheckCircle2, ChevronRight } from "lucide-react";
import AnimalGuide from "@/components/kids/AnimalGuide";
import { useSoundEffects } from "@/hooks/useSoundEffects";

/* ─────────────────────────────────────────────────────────────
   1. MONTESSORI BEAD STAIR & MATH COUNTER
   Concrete quantities represented as colored bead bars (1 to 10)
───────────────────────────────────────────────────────────── */

const beadColors: Record<number, string> = {
  1: "bg-red-500 border-red-600 text-white",
  2: "bg-green-500 border-green-600 text-white",
  3: "bg-pink-400 border-pink-500 text-white",
  4: "bg-yellow-400 border-yellow-500 text-slate-900",
  5: "bg-cyan-500 border-cyan-600 text-white",
  6: "bg-purple-500 border-purple-600 text-white",
  7: "bg-amber-700 border-amber-800 text-white",
  8: "bg-blue-600 border-blue-700 text-white",
  9: "bg-indigo-600 border-indigo-700 text-white",
  10: "bg-amber-400 border-amber-500 text-slate-900 font-bold",
};

const mathChallenges = [
  { target: 5, prompt: "Build the quantity 5 using bead bars!", hint: "Tap bead bar 2 and bead bar 3, or bead bar 5 directly." },
  { target: 7, prompt: "Combine bead bars to make 7!", hint: "Try 3 + 4, or 5 + 2!" },
  { target: 10, prompt: "Form the Golden Ten bead bar!", hint: "Try 5 + 5 or 7 + 3!" },
];

const BeadStairMath = () => {
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [selectedBeads, setSelectedBeads] = useState<number[]>([]);
  const [solved, setSolved] = useState(false);
  const { play } = useSoundEffects();

  const currentChallenge = mathChallenges[challengeIdx];
  const sum = selectedBeads.reduce((a, b) => a + b, 0);

  const addBead = (n: number) => {
    if (solved) return;
    const next = [...selectedBeads, n];
    setSelectedBeads(next);
    const newSum = next.reduce((a, b) => a + b, 0);
    play("pop");

    if (newSum === currentChallenge.target) {
      setSolved(true);
      play("correct");
    } else if (newSum > currentChallenge.target) {
      play("wrong");
    }
  };

  const reset = () => {
    setSelectedBeads([]);
    setSolved(false);
  };

  const nextChallenge = () => {
    setSelectedBeads([]);
    setSolved(false);
    setChallengeIdx((i) => (i + 1) % mathChallenges.length);
  };

  const speak = (text: string) => {
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.85;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch {
      /* ignore if unsupported */
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Target card */}
      <div className="kid-tile kid-tile-sky rounded-2xl p-5 text-center flex flex-col items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Challenge {challengeIdx + 1} of {mathChallenges.length}
        </span>
        <h3 className="font-display text-2xl font-black text-foreground">
          {currentChallenge.prompt}
        </h3>
        <p className="text-sm font-semibold text-primary">
          Target Sum: <span className="font-black text-2xl text-accent underline">{currentChallenge.target}</span>
        </p>

        {/* Selected Tray */}
        <div className="w-full min-h-[72px] bg-background/60 border-2 border-dashed border-primary/40 rounded-xl p-3 flex flex-wrap items-center justify-center gap-3 mt-2">
          {selectedBeads.length === 0 && (
            <span className="text-xs text-muted-foreground italic">
              Tap bead bars below to place them in your sensory tray
            </span>
          )}
          {selectedBeads.map((b, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, y: -10 }}
              animate={{ scale: 1, y: 0 }}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full border shadow-sm ${beadColors[b]}`}
            >
              <div className="flex gap-1">
                {Array.from({ length: b }).map((_, k) => (
                  <span key={k} className="w-3 h-3 rounded-full bg-white/70 shadow-inner block" />
                ))}
              </div>
              <span className="text-xs font-black ml-1">({b})</span>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-3 mt-1">
          <span className="text-sm font-bold text-foreground">
            Current Total: <span className={`text-lg font-black ${sum === currentChallenge.target ? "text-xp" : sum > currentChallenge.target ? "text-enemy" : "text-primary"}`}>{sum}</span>
          </span>
          <button
            onClick={reset}
            className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 underline"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear Tray
          </button>
        </div>

        {/* Control of Error Feedback */}
        {sum > currentChallenge.target && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold text-enemy bg-enemy/10 px-3 py-1.5 rounded-lg border border-enemy/30"
          >
            Too big! That equals {sum}. Tap "Clear Tray" and try smaller bead bars.
          </motion.p>
        )}

        {solved && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full bg-xp/20 border border-xp/50 rounded-xl p-3 flex items-center justify-between gap-3 mt-2"
          >
            <div className="flex items-center gap-2 text-xp font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-xp shrink-0" />
              <span>Perfect! You formed {currentChallenge.target}! 🎉</span>
            </div>
            <button onClick={nextChallenge} className="kid-btn text-xs py-1.5 px-3">
              Next Challenge <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Montessori Bead Stair (1 to 10) */}
      <div>
        <h4 className="font-display font-bold text-sm text-foreground mb-2 flex items-center gap-2">
          🧮 Tap a Bead Bar to Add (Montessori Bead Stair 1–10)
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((val) => (
            <motion.button
              key={val}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                addBead(val);
                speak(`${val}`);
              }}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-between gap-2 transition-all shadow-sm ${beadColors[val]}`}
            >
              <span className="font-display text-base font-black">{val}</span>
              <div className="flex flex-wrap items-center justify-center gap-1 max-w-[80px]">
                {Array.from({ length: val }).map((_, idx) => (
                  <span
                    key={idx}
                    className="w-2.5 h-2.5 rounded-full bg-white/80 border border-black/10 shadow-inner block"
                  />
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   2. MOVABLE ALPHABET (LANGUAGE)
   Pink for vowels, blue for consonants, with target word builder
───────────────────────────────────────────────────────────── */

const vowels = ["A", "E", "I", "O", "U"];
const consonants = ["B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z"];

const wordPuzzles = [
  { word: "CAT", hint: "🐱 A fluffy pet that meows", visual: "🐱" },
  { word: "SUN", hint: "☀️ Bright light in the sky", visual: "☀️" },
  { word: "TREE", hint: "🌳 Grows green leaves in nature", visual: "🌳" },
  { word: "FISH", hint: "🐟 Swims in clean blue water", visual: "🐟" },
];

const MovableAlphabet = () => {
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [spelled, setSpelled] = useState<string[]>([]);
  const [solved, setSolved] = useState(false);
  const { play } = useSoundEffects();

  const currentPuzzle = wordPuzzles[puzzleIdx];

  const addLetter = (char: string) => {
    if (solved) return;
    const next = [...spelled, char];
    setSpelled(next);
    play("pop");

    const currentWord = next.join("");
    if (currentWord === currentPuzzle.word) {
      setSolved(true);
      play("correct");
    } else if (!currentPuzzle.word.startsWith(currentWord)) {
      play("wrong");
    }
  };

  const removeLast = () => {
    setSpelled((s) => s.slice(0, -1));
    setSolved(false);
  };

  const nextPuzzle = () => {
    setSpelled([]);
    setSolved(false);
    setPuzzleIdx((i) => (i + 1) % wordPuzzles.length);
  };

  const speakWord = () => {
    try {
      const u = new SpeechSynthesisUtterance(currentPuzzle.word);
      u.rate = 0.8;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Target Word Card */}
      <div className="kid-tile kid-tile-peach rounded-2xl p-5 text-center flex flex-col items-center gap-3">
        <div className="text-6xl">{currentPuzzle.visual}</div>
        <h3 className="font-display text-2xl font-black text-foreground">
          Spell "{currentPuzzle.word}"
        </h3>
        <p className="text-xs text-muted-foreground font-semibold">{currentPuzzle.hint}</p>

        {/* Word Slots */}
        <div className="flex items-center justify-center gap-2 mt-2">
          {Array.from({ length: currentPuzzle.word.length }).map((_, i) => {
            const letter = spelled[i];
            const isVowel = letter && vowels.includes(letter);
            return (
              <motion.div
                key={i}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`w-14 h-16 rounded-xl border-2 flex items-center justify-center font-display text-3xl font-black shadow-md ${
                  letter
                    ? isVowel
                      ? "bg-pink-100 border-pink-400 text-pink-600"
                      : "bg-blue-100 border-blue-400 text-blue-600"
                    : "bg-background/80 border-dashed border-primary/40 text-muted-foreground"
                }`}
              >
                {letter || "_"}
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={speakWord}
            className="kid-btn text-xs py-1 px-3 inline-flex items-center gap-1"
          >
            <Volume2 className="w-3.5 h-3.5" /> Listen Word
          </button>
          {spelled.length > 0 && (
            <button
              onClick={removeLast}
              className="text-xs font-bold text-muted-foreground hover:text-foreground underline"
            >
              Backspace
            </button>
          )}
        </div>

        {/* Control of Error */}
        {spelled.length > 0 && !currentPuzzle.word.startsWith(spelled.join("")) && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-bold text-enemy bg-enemy/10 px-3 py-1 rounded-lg border border-enemy/30"
          >
            Oops! "{spelled.join("")}" doesn't match {currentPuzzle.word}. Tap backspace and retry!
          </motion.p>
        )}

        {solved && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full bg-xp/20 border border-xp/50 rounded-xl p-3 flex items-center justify-between gap-3 mt-1"
          >
            <div className="flex items-center gap-2 text-xp font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-xp shrink-0" />
              <span>Great job! You spelled {currentPuzzle.word}! 🎉</span>
            </div>
            <button onClick={nextPuzzle} className="kid-btn text-xs py-1.5 px-3">
              Next Word <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Montessori Wooden Letter Tray */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-display font-bold text-sm text-foreground">
            🔤 Wooden Movable Alphabet
          </h4>
          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="flex items-center gap-1 text-pink-600">
              <span className="w-3 h-3 rounded-full bg-pink-400 block" /> Vowels (Pink)
            </span>
            <span className="flex items-center gap-1 text-blue-600">
              <span className="w-3 h-3 rounded-full bg-blue-400 block" /> Consonants (Blue)
            </span>
          </div>
        </div>

        <div className="bg-amber-950/10 border-2 border-amber-800/30 rounded-2xl p-4 flex flex-col gap-3">
          {/* Vowels */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {vowels.map((char) => (
              <motion.button
                key={char}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => addLetter(char)}
                className="w-11 h-11 rounded-xl bg-pink-500 border-2 border-pink-600 text-white font-display text-xl font-black shadow-sm flex items-center justify-center"
              >
                {char}
              </motion.button>
            ))}
          </div>

          {/* Consonants */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {consonants.map((char) => (
              <motion.button
                key={char}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => addLetter(char)}
                className="w-10 h-10 rounded-xl bg-blue-500 border-2 border-blue-600 text-white font-display text-lg font-black shadow-sm flex items-center justify-center"
              >
                {char}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   3. PINK TOWER & COLOR TABLETS (SENSORY SORTING)
   Order blocks from largest to smallest (Montessori Pink Tower)
───────────────────────────────────────────────────────────── */

const initialTower = [
  { size: 10, label: "10cm", color: "bg-pink-600" },
  { size: 4, label: "4cm", color: "bg-pink-300" },
  { size: 8, label: "8cm", color: "bg-pink-500" },
  { size: 2, label: "2cm", color: "bg-pink-200" },
  { size: 6, label: "6cm", color: "bg-pink-400" },
];

const PinkTowerSort = () => {
  const [stack, setStack] = useState<typeof initialTower>([]);
  const [available, setAvailable] = useState<typeof initialTower>(initialTower);
  const [solved, setSolved] = useState(false);
  const { play } = useSoundEffects();

  const addBlock = (block: (typeof initialTower)[number]) => {
    if (solved) return;
    const nextStack = [...stack, block];
    const nextAvailable = available.filter((b) => b.size !== block.size);
    setStack(nextStack);
    setAvailable(nextAvailable);
    play("pop");

    // Check order (should be descending: 10, 8, 6, 4, 2)
    if (nextStack.length === initialTower.length) {
      const isCorrect = nextStack.every((b, i) => i === 0 || b.size < nextStack[i - 1].size);
      if (isCorrect) {
        setSolved(true);
        play("correct");
      } else {
        play("wrong");
      }
    }
  };

  const reset = () => {
    setStack([]);
    setAvailable(initialTower);
    setSolved(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="kid-tile kid-tile-mint rounded-2xl p-5 text-center flex flex-col items-center gap-3">
        <h3 className="font-display text-2xl font-black text-foreground">
          🗼 Montessori Pink Tower
        </h3>
        <p className="text-sm font-semibold text-muted-foreground">
          Stack the blocks in order from <span className="font-bold text-primary">LARGEST at the bottom</span> to <span className="font-bold text-accent">SMALLEST at the top</span>.
        </p>

        {/* Stack Area */}
        <div className="w-full min-h-[220px] bg-background/60 border-2 border-dashed border-primary/40 rounded-xl p-4 flex flex-col items-center justify-end gap-1.5">
          {stack.length === 0 && (
            <span className="text-xs text-muted-foreground italic my-auto">
              Tap blocks from available tray below to stack them here
            </span>
          )}
          {[...stack].reverse().map((b) => (
            <motion.div
              key={b.size}
              initial={{ scale: 0.6, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              style={{ width: `${b.size * 9.5}%` }}
              className={`h-8 rounded-lg ${b.color} border border-pink-700/40 text-white font-display text-xs font-bold flex items-center justify-center shadow-md`}
            >
              {b.label}
            </motion.div>
          ))}
        </div>

        <button
          onClick={reset}
          className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 underline"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Re-stack Tower
        </button>

        {/* Control of error */}
        {stack.length === initialTower.length && !solved && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-bold text-enemy bg-enemy/10 px-3 py-1.5 rounded-lg border border-enemy/30"
          >
            The tower isn't balanced! Remember to stack largest size first down to smallest. Tap re-stack to try again!
          </motion.p>
        )}

        {solved && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full bg-xp/20 border border-xp/50 rounded-xl p-3 flex items-center justify-center gap-2 text-xp font-bold text-sm"
          >
            <CheckCircle2 className="w-5 h-5 text-xp shrink-0" />
            <span>Perfect Pink Tower balance! You mastered size control! 🏰🎉</span>
          </motion.div>
        )}
      </div>

      {/* Available Blocks Tray */}
      <div>
        <h4 className="font-display font-bold text-sm text-foreground mb-2">
          Available Wooden Blocks
        </h4>
        <div className="flex flex-wrap items-center justify-center gap-3 bg-secondary/50 p-4 rounded-2xl border border-border">
          {available.map((b) => (
            <motion.button
              key={b.size}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => addBlock(b)}
              style={{ width: `${b.size * 8}%`, minWidth: "60px" }}
              className={`h-10 rounded-xl ${b.color} border border-pink-700/40 text-white font-display text-sm font-black flex items-center justify-center shadow-md`}
            >
              {b.label}
            </motion.button>
          ))}
          {available.length === 0 && !solved && (
            <span className="text-xs text-muted-foreground italic">All blocks stacked!</span>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   MAIN MONTESSORI KIDS LAB WRAPPER
───────────────────────────────────────────────────────────── */

type TabType = "math" | "language" | "sensory";

const MontessoriKidsLab = () => {
  const [tab, setTab] = useState<TabType>("math");

  return (
    <div className="kid-tile kid-tile-lilac rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center text-3xl">
            ✨
          </div>
          <div>
            <h2 className="font-display text-2xl font-black text-foreground">
              Montessori Sensory Workshop
            </h2>
            <p className="text-xs font-bold text-muted-foreground">
              Self-directed learning through hands-on materials & self-correction
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 bg-background/60 p-1.5 rounded-2xl border border-border w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setTab("math")}
            className={`px-3.5 py-2 rounded-xl text-xs font-display font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              tab === "math"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            🧮 Bead Stair (Math)
          </button>
          <button
            onClick={() => setTab("language")}
            className={`px-3.5 py-2 rounded-xl text-xs font-display font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              tab === "language"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            🔤 Movable Alphabet
          </button>
          <button
            onClick={() => setTab("sensory")}
            className={`px-3.5 py-2 rounded-xl text-xs font-display font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              tab === "sensory"
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            🗼 Pink Tower (Logic)
          </button>
        </div>
      </div>

      {/* Guide Note */}
      <div className="mb-6">
        <AnimalGuide
          animal="lion"
          mood="greet"
          message={
            tab === "math"
              ? "Touch the colored bead bars to discover quantities and addition naturally!"
              : tab === "language"
              ? "Use pink vowels and blue consonants from our wooden alphabet box to form words!"
              : "Stack the pink blocks by size! Notice how size control creates balance."
          }
          size="sm"
          showName={false}
        />
      </div>

      {/* Main Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
        >
          {tab === "math" && <BeadStairMath />}
          {tab === "language" && <MovableAlphabet />}
          {tab === "sensory" && <PinkTowerSort />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MontessoriKidsLab;
