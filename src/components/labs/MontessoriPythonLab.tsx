import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, CheckCircle2, AlertTriangle, Layers, Cpu, Box, Sparkles, Code2, ArrowRight } from "lucide-react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

/* ─────────────────────────────────────────────────────────────
   MONTESSORI PYTHON LESSON 1: TACTILE VARIABLE MEMORY BOXES
───────────────────────────────────────────────────────────── */

type VarBox = { name: string; type: "str" | "int" | "list"; val: string | null };

const initialBoxes: VarBox[] = [
  { name: "user_name", type: "str", val: null },
  { name: "level", type: "int", val: null },
  { name: "inventory", type: "list", val: null },
];

const availableValues = [
  { id: "v1", text: '"Ada Lovelace"', type: "str", val: '"Ada Lovelace"' },
  { id: "v2", text: "42", type: "int", val: "42" },
  { id: "v3", text: '["Shield", "Potion"]', type: "list", val: '["Shield", "Potion"]' },
  { id: "v4", text: "99", type: "int", val: "99" },
];

const VariableMemoryWorkshop = () => {
  const [boxes, setBoxes] = useState<VarBox[]>(initialBoxes);
  const [selectedVal, setSelectedVal] = useState<(typeof availableValues)[number] | null>(null);
  const [feedback, setFeedback] = useState<{ msg: string; err?: boolean } | null>(null);
  const { play } = useSoundEffects();

  const assignValueToBox = (boxName: string) => {
    if (!selectedVal) {
      setFeedback({ msg: "Select a data block from below first!", err: true });
      return;
    }

    const box = boxes.find((b) => b.name === boxName);
    if (!box) return;

    // Control of error (Type check)
    if (box.type !== selectedVal.type) {
      play("wrong");
      setFeedback({
        msg: `Type Mismatch Error! '${boxName}' expects a ${box.type.toUpperCase()} block, but you provided a ${selectedVal.type.toUpperCase()} block.`,
        err: true,
      });
      return;
    }

    play("correct");
    setBoxes((prev) =>
      prev.map((b) => (b.name === boxName ? { ...b, val: selectedVal.val } : b))
    );
    setFeedback({
      msg: `Success! Allocated variable ${boxName} = ${selectedVal.val} in RAM.`,
      err: false,
    });
    setSelectedVal(null);
  };

  const reset = () => {
    setBoxes(initialBoxes);
    setSelectedVal(null);
    setFeedback(null);
  };

  const allAssigned = boxes.every((b) => b.val !== null);

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
        <h4 className="font-display text-lg font-bold text-foreground">
          📦 Lesson 1: Variables as Memory Boxes
        </h4>
        <p className="text-xs text-muted-foreground mt-1">
          In Python, variables are named labels that point to values stored in memory. Select a data block below and assign it to its matching container slot!
        </p>
      </div>

      {/* Memory Containers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {boxes.map((b) => (
          <motion.div
            key={b.name}
            whileHover={{ scale: 1.02 }}
            onClick={() => assignValueToBox(b.name)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex flex-col justify-between min-h-[140px] shadow-sm ${
              b.val !== null
                ? "bg-xp/10 border-xp/60"
                : selectedVal?.type === b.type
                ? "bg-primary/10 border-primary ring-2 ring-primary/40 animate-pulse"
                : "bg-background border-dashed border-border hover:border-primary/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-primary flex items-center gap-1.5">
                <Box className="w-4 h-4 text-accent" /> {b.name}
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground border">
                {b.type}
              </span>
            </div>

            <div className="my-3 text-center">
              {b.val !== null ? (
                <motion.div
                  initial={{ scale: 0.6 }}
                  animate={{ scale: 1 }}
                  className="font-mono text-sm font-black text-xp bg-xp/20 px-3 py-1.5 rounded-lg border border-xp/40 inline-block"
                >
                  {b.val}
                </motion.div>
              ) : (
                <span className="text-xs text-muted-foreground italic">
                  [Empty Slot — Tap to Assign]
                </span>
              )}
            </div>

            <span className="text-[11px] text-muted-foreground font-mono text-right">
              {b.val ? "0x" + Math.floor(Math.random() * 89999 + 10000).toString(16) : "Unallocated"}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Selectable Data Blocks */}
      <div>
        <h5 className="font-display font-bold text-sm text-foreground mb-2 flex items-center gap-2">
          🧩 Available Data Value Blocks (RAM Pool)
        </h5>
        <div className="flex flex-wrap gap-3 p-4 bg-secondary/40 rounded-xl border border-border">
          {availableValues.map((v) => {
            const isSelected = selectedVal?.id === v.id;
            return (
              <motion.button
                key={v.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedVal(v);
                  play("pop");
                }}
                className={`px-4 py-2 rounded-lg font-mono text-xs border font-bold transition-all shadow-sm flex items-center gap-2 ${
                  isSelected
                    ? "bg-accent text-accent-foreground border-accent ring-2 ring-accent/40"
                    : "bg-background border-border hover:border-primary text-foreground"
                }`}
              >
                <span>{v.text}</span>
                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-secondary text-muted-foreground border">
                  {v.type}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Control of Error Feedback */}
      {feedback && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-3 rounded-lg border text-xs font-mono flex items-center gap-2.5 ${
            feedback.err
              ? "bg-enemy/10 border-enemy/40 text-enemy font-semibold"
              : "bg-xp/10 border-xp/40 text-xp font-semibold"
          }`}
        >
          {feedback.err ? <AlertTriangle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
          <span>{feedback.msg}</span>
        </motion.div>
      )}

      {allAssigned && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 rounded-xl border border-xp/50 bg-xp/15 flex items-center justify-between"
        >
          <div className="flex items-center gap-2 text-xp font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-xp shrink-0" />
            <span>All variable memory slots successfully assigned! 🎯</span>
          </div>
          <button
            onClick={reset}
            className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-secondary flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Memory
          </button>
        </motion.div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   MONTESSORI PYTHON LESSON 2: TYPE CONVERSION & CONTROL OF ERROR
───────────────────────────────────────────────────────────── */

const TypeConversionWorkshop = () => {
  const [hasStrConversion, setHasStrConversion] = useState(false);
  const [executed, setExecuted] = useState(false);
  const { play } = useSoundEffects();

  const runCode = () => {
    setExecuted(true);
    if (hasStrConversion) {
      play("correct");
    } else {
      play("wrong");
    }
  };

  const reset = () => {
    setHasStrConversion(false);
    setExecuted(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
        <h4 className="font-display text-lg font-bold text-foreground">
          🔌 Lesson 2: Control of Error & Type Safety
        </h4>
        <p className="text-xs text-muted-foreground mt-1">
          In Python, trying to combine a string and integer without explicit conversion causes a TypeError. Plug in the missing `str()` conversion block to fix the snippet!
        </p>
      </div>

      {/* Code Slot */}
      <div className="bg-background/80 border border-border rounded-xl p-5 font-mono text-sm">
        <div className="text-muted-foreground text-xs mb-3"># Python Script Snippet</div>
        <div className="flex items-center flex-wrap gap-2 leading-relaxed">
          <span className="text-accent font-bold">score = 100</span>
        </div>
        <div className="flex items-center flex-wrap gap-2 mt-3">
          <span className="text-accent font-bold">message = "Your score is: " +</span>
          {hasStrConversion ? (
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-xp/20 text-xp border border-xp/50 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1"
            >
              str(score)
            </motion.span>
          ) : (
            <span className="bg-enemy/20 text-enemy border border-dashed border-enemy/50 px-3 py-1 rounded-lg font-bold animate-pulse">
              score <span className="text-[10px] text-muted-foreground">(Unconverted int)</span>
            </span>
          )}
        </div>
        <div className="mt-3">
          <span className="text-accent font-bold">print(message)</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => setHasStrConversion(!hasStrConversion)}
          className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold border transition-all flex items-center gap-2 ${
            hasStrConversion
              ? "bg-xp/20 text-xp border-xp/50"
              : "bg-secondary border-border text-foreground hover:border-primary"
          }`}
        >
          <span>{hasStrConversion ? "✓ str(score) Conversion Block Plugged" : "+ Plug str(score) Conversion Block"}</span>
        </button>

        <div className="flex gap-2">
          <button
            onClick={runCode}
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-display font-bold text-sm flex items-center gap-2 shadow"
          >
            <Play className="w-4 h-4" /> Run Code
          </button>
          <button
            onClick={reset}
            className="px-3 py-2 rounded-xl border border-border text-xs hover:bg-secondary"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terminal Output */}
      {executed && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-border bg-black/80 p-4 font-mono text-xs overflow-hidden"
        >
          <div className="text-muted-foreground text-[10px] uppercase mb-2">PVM Execution Log</div>
          {hasStrConversion ? (
            <div className="text-xp leading-relaxed">
              $ python script.py<br />
              <span className="font-bold text-sm">Your score is: 100</span><br />
              <span className="text-[11px] text-muted-foreground">Process finished with exit code 0 (Success)</span>
            </div>
          ) : (
            <div className="text-enemy leading-relaxed">
              $ python script.py<br />
              TypeError: can only concatenate str (not "int") to str<br />
              <span className="text-[11px] text-muted-foreground">Control of Error: Convert 'score' using str(score) before concatenating with text.</span>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   MAIN MONTESSORI PYTHON LAB COMPONENT
───────────────────────────────────────────────────────────── */

type PythonTab = "vars" | "types";

const MontessoriPythonLab = ({ chapterId }: { chapterId?: string }) => {
  const [tab, setTab] = useState<PythonTab>("vars");

  return (
    <div className="game-card border border-primary/40 bg-gradient-to-b from-primary/5 to-transparent p-5 sm:p-6 rounded-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/15 border border-primary/30">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-foreground">
              🧩 Montessori Python Workshop
            </h3>
            <p className="text-xs text-muted-foreground">
              Self-directed code manipulatives, memory containers & type safety
            </p>
          </div>
        </div>

        {/* Lesson Sub-tabs */}
        <div className="flex items-center gap-1.5 bg-secondary/60 p-1 rounded-xl border border-border">
          <button
            onClick={() => setTab("vars")}
            className={`px-3 py-1.5 rounded-lg text-xs font-display font-bold transition-all flex items-center gap-1 ${
              tab === "vars"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            📦 1. Memory Boxes
          </button>
          <button
            onClick={() => setTab("types")}
            className={`px-3 py-1.5 rounded-lg text-xs font-display font-bold transition-all flex items-center gap-1 ${
              tab === "types"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            🔌 2. Type Control
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {tab === "vars" && <VariableMemoryWorkshop />}
          {tab === "types" && <TypeConversionWorkshop />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MontessoriPythonLab;
