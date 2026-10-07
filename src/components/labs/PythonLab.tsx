import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, ChevronRight, Terminal, Cpu, FileCode2, Binary, Sparkles } from "lucide-react";
import MontessoriPythonLab from "./MontessoriPythonLab";

/* ─────────────────────────── Pipeline: how Python runs ─────────────────────────── */

const pipeline = [
  {
    key: "source",
    icon: FileCode2,
    title: "1. You write source code",
    detail: "Your .py file is just plain text. Nothing runs yet — it's a recipe, not a meal.",
    sample: `print("Hello, World!")`,
  },
  {
    key: "tokens",
    icon: Sparkles,
    title: "2. Tokenizer splits it up",
    detail: "Python chops the text into tokens: names, symbols, strings, numbers.",
    sample: `NAME:print  (  STRING:"Hello, World!"  )`,
  },
  {
    key: "ast",
    icon: Binary,
    title: "3. Parser builds an AST",
    detail: "Tokens become a tree describing the meaning: 'call print with one string'.",
    sample: `Call\n └── func: Name(print)\n └── args: Str("Hello, World!")`,
  },
  {
    key: "bytecode",
    icon: Cpu,
    title: "4. Compiled to bytecode",
    detail: "The tree is compiled into small instructions and cached in __pycache__ (.pyc).",
    sample: `LOAD_NAME   print\nLOAD_CONST  'Hello, World!'\nCALL        1\nRETURN_VALUE`,
  },
  {
    key: "pvm",
    icon: Terminal,
    title: "5. The PVM runs it",
    detail: "The Python Virtual Machine executes each instruction and you finally see output.",
    sample: `Hello, World!`,
  },
];

const PipelineView = () => {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(false);

  useEffect(() => {
    if (!auto) return;
    if (step >= pipeline.length - 1) {
      setAuto(false);
      return;
    }
    const t = setTimeout(() => setStep((s) => s + 1), 1400);
    return () => clearTimeout(t);
  }, [auto, step]);

  const active = pipeline[step];
  const Icon = active.icon;

  return (
    <div className="flex flex-col gap-4">
      {/* stage rail */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {pipeline.map((p, i) => (
          <div key={p.key} className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setStep(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-display font-bold border transition-all ${
                i === step
                  ? "bg-primary text-primary-foreground border-primary glow-primary"
                  : i < step
                  ? "bg-xp/15 text-xp border-xp/40"
                  : "bg-secondary text-muted-foreground border-border"
              }`}
            >
              {p.key}
            </button>
            {i < pipeline.length - 1 && (
              <ChevronRight className="w-3 h-3 text-muted-foreground shrink-0" />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="rounded-xl border border-primary/25 bg-primary/5 p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <Icon className="w-4 h-4 text-primary" />
            <h5 className="font-display font-bold text-sm text-foreground">{active.title}</h5>
          </div>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{active.detail}</p>
          <pre className="bg-background/70 border border-border rounded-lg p-3 text-xs font-mono text-accent whitespace-pre overflow-x-auto">
            {active.sample}
          </pre>
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-2">
        <button
          onClick={() => {
            setStep(0);
            setAuto(true);
          }}
          className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg font-display font-bold text-sm flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4" /> Watch it compile
        </button>
        <button
          onClick={() => setStep((s) => Math.min(pipeline.length - 1, s + 1))}
          className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-secondary"
        >
          Next step
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────── Hello World builder ─────────────────────────── */

const helloParts = [
  { token: "print", note: "the built-in function that shows text" },
  { token: "(", note: "start of the arguments" },
  { token: '"Hello, World!"', note: "a string — text wrapped in quotes" },
  { token: ")", note: "end of the arguments — now Python calls print" },
];

const HelloWorldBuilder = () => {
  const [built, setBuilt] = useState(0);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);

  const done = built === helloParts.length;

  const run = () => {
    setRunning(true);
    setOutput("");
    const text = "Hello, World!";
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOutput(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setRunning(false);
      }
    }, 55);
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Tap the pieces in order to build your first program — each piece explains itself.
      </p>

      {/* code line */}
      <div className="bg-background/70 border border-border rounded-lg p-4 min-h-[56px] flex items-center flex-wrap gap-1 font-mono text-sm">
        {helloParts.slice(0, built).map((p) => (
          <motion.span
            key={p.token}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-accent"
          >
            {p.token}
          </motion.span>
        ))}
        {!done && <span className="w-2 h-4 bg-primary animate-pulse rounded-sm" />}
      </div>

      {/* choices */}
      <div className="flex flex-wrap gap-2">
        {helloParts.map((p, i) => (
          <motion.button
            key={p.token}
            whileHover={{ scale: i === built ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
            disabled={i !== built}
            onClick={() => setBuilt(i + 1)}
            className={`px-3 py-2 rounded-lg border font-mono text-xs transition-all ${
              i < built
                ? "bg-xp/15 border-xp/40 text-xp"
                : i === built
                ? "bg-secondary border-primary/50 text-foreground"
                : "bg-secondary/40 border-border text-muted-foreground opacity-50"
            }`}
          >
            {p.token}
          </motion.button>
        ))}
      </div>

      {built > 0 && (
        <motion.p
          key={built}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-accent bg-accent/10 border border-accent/20 rounded-lg px-3 py-2"
        >
          💡 <span className="font-mono">{helloParts[built - 1].token}</span> — {helloParts[built - 1].note}
        </motion.p>
      )}

      <div className="flex gap-2">
        <button
          disabled={!done || running}
          onClick={run}
          className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg font-display font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-40"
        >
          <Play className="w-4 h-4" /> Run program
        </button>
        <button
          onClick={() => {
            setBuilt(0);
            setOutput("");
          }}
          className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-secondary flex items-center gap-1"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
      </div>

      {/* terminal */}
      <div className="rounded-lg border border-border bg-black/60 overflow-hidden">
        <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-border bg-secondary/40">
          <span className="w-2.5 h-2.5 rounded-full bg-enemy/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-coin/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-xp/70" />
          <span className="text-[10px] text-muted-foreground ml-2 font-mono">terminal</span>
        </div>
        <pre className="p-3 text-xs font-mono text-xp min-h-[52px] whitespace-pre-wrap">
          {"$ python hello.py\n"}
          {output}
          {running && <span className="animate-pulse">▌</span>}
        </pre>
      </div>
    </div>
  );
};

/* ─────────────────────────── Step runner ─────────────────────────── */

type Frame = { line: number; vars: Record<string, string>; out: string[]; note: string };
type Snippet = { title: string; code: string[]; frames: Frame[] };

const snippets: Record<string, Snippet> = {
  "py-1": {
    title: "Variables & types",
    code: ["name = \"Ada\"", "age = 36", "age = age + 1", "print(name, age)"],
    frames: [
      { line: 0, vars: { name: '"Ada"' }, out: [], note: "A box called name is created holding the string \"Ada\"." },
      { line: 1, vars: { name: '"Ada"', age: "36" }, out: [], note: "age holds the integer 36 — no type keyword needed." },
      { line: 2, vars: { name: '"Ada"', age: "37" }, out: [], note: "Right side is computed first (36 + 1), then stored back in age." },
      { line: 3, vars: { name: '"Ada"', age: "37" }, out: ["Ada 37"], note: "print sends both values to the terminal, separated by a space." },
    ],
  },
  "py-2": {
    title: "Loops & conditions",
    code: ["total = 0", "for i in range(3):", "    if i % 2 == 0:", "        total = total + i", "print(total)"],
    frames: [
      { line: 0, vars: { total: "0" }, out: [], note: "Start the counter at 0." },
      { line: 1, vars: { total: "0", i: "0" }, out: [], note: "range(3) gives 0, 1, 2 — first pass i = 0." },
      { line: 3, vars: { total: "0", i: "0" }, out: [], note: "0 is even, so add it: total stays 0." },
      { line: 1, vars: { total: "0", i: "1" }, out: [], note: "Next pass, i = 1." },
      { line: 2, vars: { total: "0", i: "1" }, out: [], note: "1 is odd → condition false, the body is skipped." },
      { line: 3, vars: { total: "2", i: "2" }, out: [], note: "i = 2 is even → total becomes 0 + 2 = 2." },
      { line: 4, vars: { total: "2", i: "2" }, out: ["2"], note: "Loop finished — print the result." },
    ],
  },
  "py-3": {
    title: "Functions",
    code: ["def area(w, h):", "    return w * h", "", "a = area(3, 4)", "print(a)"],
    frames: [
      { line: 0, vars: { area: "<function>" }, out: [], note: "def only defines the function — nothing runs inside it yet." },
      { line: 3, vars: { area: "<function>", w: "3", h: "4" }, out: [], note: "Calling area(3, 4) creates a new frame with w = 3, h = 4." },
      { line: 1, vars: { area: "<function>", w: "3", h: "4" }, out: [], note: "return hands 12 back to the caller and destroys the frame." },
      { line: 3, vars: { area: "<function>", a: "12" }, out: [], note: "The returned value is stored in a." },
      { line: 4, vars: { area: "<function>", a: "12" }, out: ["12"], note: "Print the result." },
    ],
  },
  "py-4": {
    title: "Lists & dictionaries",
    code: ["scores = [10, 20]", "scores.append(30)", "user = {\"name\": \"Ada\"}", "user[\"score\"] = scores[-1]", "print(user)"],
    frames: [
      { line: 0, vars: { scores: "[10, 20]" }, out: [], note: "A list keeps items in order, indexed from 0." },
      { line: 1, vars: { scores: "[10, 20, 30]" }, out: [], note: "append adds to the end — lists are mutable." },
      { line: 2, vars: { scores: "[10, 20, 30]", user: '{"name": "Ada"}' }, out: [], note: "A dict maps keys to values." },
      { line: 3, vars: { scores: "[10, 20, 30]", user: '{"name": "Ada", "score": 30}' }, out: [], note: "scores[-1] is the last item, 30 — stored under a new key." },
      { line: 4, vars: { scores: "[10, 20, 30]", user: '{"name": "Ada", "score": 30}' }, out: ['{\'name\': \'Ada\', \'score\': 30}'], note: "Dicts print with their keys and values." },
    ],
  },
  "py-5": {
    title: "File handling",
    code: ["with open(\"log.txt\", \"w\") as f:", "    f.write(\"hi\")", "with open(\"log.txt\") as f:", "    data = f.read()", "print(data)"],
    frames: [
      { line: 0, vars: { f: "<file 'w'>" }, out: [], note: "with opens the file and guarantees it closes afterwards." },
      { line: 1, vars: { f: "<file 'w'>" }, out: [], note: "write puts text into the file (mode 'w' overwrites)." },
      { line: 2, vars: { f: "<file 'r'>" }, out: [], note: "Reopening in default read mode." },
      { line: 3, vars: { f: "<file 'r'>", data: '"hi"' }, out: [], note: "read() pulls the whole file into a string." },
      { line: 4, vars: { data: '"hi"' }, out: ["hi"], note: "File is closed automatically, and we print the contents." },
    ],
  },
};

const StepRunner = ({ chapterId }: { chapterId: string }) => {
  const snippet = snippets[chapterId] ?? snippets["py-1"];
  const [idx, setIdx] = useState(-1);
  const [auto, setAuto] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setIdx(-1);
    setAuto(false);
  }, [chapterId]);

  useEffect(() => {
    if (!auto) return;
    if (idx >= snippet.frames.length - 1) {
      setAuto(false);
      return;
    }
    timer.current = setTimeout(() => setIdx((i) => i + 1), 1300);
    return () => clearTimeout(timer.current);
  }, [auto, idx, snippet]);

  const frame = idx >= 0 ? snippet.frames[idx] : null;
  const vars = frame?.vars ?? {};
  const varList = useMemo(() => Object.entries(vars), [vars]);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Step through <span className="text-foreground font-medium">{snippet.title}</span> line by line and watch the
        variables and output change.
      </p>

      {/* code */}
      <div className="bg-background/70 border border-border rounded-lg overflow-hidden">
        {snippet.code.map((line, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 px-3 py-1 font-mono text-xs transition-colors ${
              frame?.line === i ? "bg-primary/15 border-l-2 border-primary" : "border-l-2 border-transparent"
            }`}
          >
            <span className="text-muted-foreground select-none w-4 text-right">{i + 1}</span>
            <span className={frame?.line === i ? "text-primary" : "text-accent/80"}>{line || " "}</span>
          </div>
        ))}
      </div>

      {frame && (
        <motion.p
          key={idx}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-accent bg-accent/10 border border-accent/20 rounded-lg px-3 py-2 leading-relaxed"
        >
          {frame.note}
        </motion.p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* memory */}
        <div className="rounded-lg border border-border p-3">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-2 font-display">Memory</p>
          <div className="flex flex-col gap-1.5">
            <AnimatePresence initial={false}>
              {varList.length === 0 && <span className="text-xs text-muted-foreground">— empty —</span>}
              {varList.map(([k, v]) => (
                <motion.div
                  key={k}
                  layout
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-xs font-mono"
                >
                  <span className="px-2 py-0.5 rounded bg-primary/15 text-primary">{k}</span>
                  <span className="text-muted-foreground">→</span>
                  <motion.span key={v} initial={{ scale: 1.15 }} animate={{ scale: 1 }} className="text-xp">
                    {v}
                  </motion.span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* output */}
        <div className="rounded-lg border border-border bg-black/60 p-3">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-2 font-display">Output</p>
          <pre className="text-xs font-mono text-xp whitespace-pre-wrap min-h-[24px]">
            {(frame?.out ?? []).join("\n")}
          </pre>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => {
            setIdx(0);
            setAuto(true);
          }}
          className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg font-display font-bold text-sm flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4" /> Auto-run
        </button>
        <button
          onClick={() => setIdx((i) => Math.min(snippet.frames.length - 1, i + 1))}
          className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-secondary"
        >
          Step →
        </button>
        <button
          onClick={() => {
            setAuto(false);
            setIdx(-1);
          }}
          className="px-3 py-2 rounded-lg border border-border text-sm hover:bg-secondary"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────── Shell ─────────────────────────── */

const tabs = [
  { id: "montessori", label: "🧩 Montessori Method" },
  { id: "pipeline", label: "⚙️ How Python runs" },
  { id: "hello", label: "👋 Hello World" },
  { id: "step", label: "🐍 Step runner" },
] as const;

const PythonLab = ({ chapterId }: { chapterId: string }) => {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("montessori");

  return (
    <div className="game-card border border-accent/30">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">🐍</span>
        <h4 className="font-display font-bold text-base text-foreground">Python Playground</h4>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-display font-bold whitespace-nowrap border transition-all ${
              tab === t.id
                ? "bg-accent/20 border-accent/50 text-accent"
                : "bg-secondary border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {tab === "montessori" && <MontessoriPythonLab chapterId={chapterId} />}
          {tab === "pipeline" && <PipelineView />}
          {tab === "hello" && <HelloWorldBuilder />}
          {tab === "step" && <StepRunner chapterId={chapterId} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PythonLab;
