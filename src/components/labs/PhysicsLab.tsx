import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw, MousePointerClick, Gauge } from "lucide-react";

interface Knob {
  key: string;
  label: string;
  emoji: string;
  unit: string;
  value: number;
  step: number;
  min: number;
  max: number;
}

interface Readout {
  label: string;
  value: string;
}

interface Output {
  label: string;
  value: string;
  formula: string;
  /** 0..1 — how fast the scene should move */
  intensity: number;
  extras: Readout[];
}

const presets: Record<
  string,
  { title: string; knobs: Knob[]; compute: (v: Record<string, number>) => Output }
> = {
  "phy-1": {
    title: "Speed Lab — tap an object to change its value",
    knobs: [
      { key: "d", label: "Distance", emoji: "🛣️", unit: "m", value: 100, step: 10, min: 10, max: 500 },
      { key: "t", label: "Time", emoji: "⏱️", unit: "s", value: 10, step: 1, min: 1, max: 60 },
    ],
    compute: (v) => {
      const speed = v.d / v.t;
      return {
        label: "Speed",
        value: `${speed.toFixed(2)} m/s`,
        formula: `speed = distance ÷ time = ${v.d} ÷ ${v.t}`,
        intensity: Math.min(speed / 30, 1),
        extras: [
          { label: "In km/h", value: `${(speed * 3.6).toFixed(1)} km/h` },
          { label: "Distance in 1 min", value: `${(speed * 60).toFixed(0)} m` },
          { label: "Time for 1 km", value: `${(1000 / speed).toFixed(1)} s` },
        ],
      };
    },
  },
  "phy-2": {
    title: "Force Lab — tap the mass or the accelerator",
    knobs: [
      { key: "m", label: "Mass", emoji: "🪨", unit: "kg", value: 5, step: 1, min: 1, max: 50 },
      { key: "a", label: "Acceleration", emoji: "🚀", unit: "m/s²", value: 3, step: 1, min: 1, max: 20 },
    ],
    compute: (v) => {
      const f = v.m * v.a;
      return {
        label: "Force",
        value: `${f.toFixed(1)} N`,
        formula: `F = m × a = ${v.m} × ${v.a}`,
        intensity: Math.min(f / 300, 1),
        extras: [
          { label: "Weight (mg)", value: `${(v.m * 9.8).toFixed(1)} N` },
          { label: "Speed after 5 s", value: `${(v.a * 5).toFixed(1)} m/s` },
          { label: "Momentum after 5 s", value: `${(v.m * v.a * 5).toFixed(0)} kg·m/s` },
        ],
      };
    },
  },
  "phy-3": {
    title: "Energy Lab — tap mass, speed or height",
    knobs: [
      { key: "m", label: "Mass", emoji: "🪨", unit: "kg", value: 4, step: 1, min: 1, max: 40 },
      { key: "v", label: "Velocity", emoji: "💨", unit: "m/s", value: 6, step: 1, min: 0, max: 40 },
      { key: "h", label: "Height", emoji: "🏔️", unit: "m", value: 10, step: 5, min: 0, max: 100 },
    ],
    compute: (v) => {
      const ke = 0.5 * v.m * v.v * v.v;
      const pe = v.m * 9.8 * v.h;
      return {
        label: "Total energy",
        value: `${(ke + pe).toFixed(0)} J`,
        formula: `KE = ½mv² = ${ke.toFixed(0)} J , PE = mgh = ${pe.toFixed(0)} J`,
        intensity: Math.min(v.v / 40, 1),
        extras: [
          { label: "Kinetic", value: `${ke.toFixed(0)} J` },
          { label: "Potential", value: `${pe.toFixed(0)} J` },
          { label: "Power over 10 s", value: `${((ke + pe) / 10).toFixed(0)} W` },
        ],
      };
    },
  },
};

const PhysicsLab = ({ chapterId }: { chapterId: string }) => {
  const preset = presets[chapterId] ?? presets["phy-1"];
  const [vals, setVals] = useState<Record<string, number>>(
    Object.fromEntries(preset.knobs.map((k) => [k.key, k.value]))
  );

  const setVal = (k: Knob, n: number) =>
    setVals((s) => ({ ...s, [k.key]: Math.min(k.max, Math.max(k.min, n)) }));

  const bump = (k: Knob, dir: 1 | -1) => setVal(k, vals[k.key] + dir * k.step);
  const reset = () => setVals(Object.fromEntries(preset.knobs.map((k) => [k.key, k.value])));

  const out = preset.compute(vals);
  const i = out.intensity; // 0..1
  const roadDur = Math.max(0.18, 2.2 - i * 2);
  const hillDur = Math.max(1.2, 9 - i * 7);
  const cloudDur = Math.max(3, 18 - i * 13);
  const wheelDur = Math.max(0.12, 1.1 - i * 0.98);

  return (
    <div className="game-card border border-accent/30 bg-accent/5 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <h4 className="font-display font-bold text-sm text-accent flex items-center gap-2">
          <MousePointerClick className="w-4 h-4" /> {preset.title}
        </h4>
        <button onClick={reset} className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground" aria-label="Reset lab">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Knobs */}
      <div className="grid gap-3 sm:grid-cols-3">
        {preset.knobs.map((k) => (
          <div key={k.key} className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background/60 p-3">
            <motion.button
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.1, rotate: 4 }}
              onClick={() => bump(k, 1)}
              className="text-4xl leading-none select-none"
              aria-label={`Increase ${k.label}`}
            >
              {k.emoji}
            </motion.button>
            <p className="text-xs text-muted-foreground">{k.label}</p>
            <motion.p key={vals[k.key]} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="font-display font-bold text-foreground">
              {vals[k.key]} <span className="text-xs text-muted-foreground">{k.unit}</span>
            </motion.p>
            <input
              type="range"
              min={k.min}
              max={k.max}
              step={k.step}
              value={vals[k.key]}
              onChange={(e) => setVal(k, Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
              aria-label={`${k.label} slider`}
            />
            <div className="flex gap-2">
              <button onClick={() => bump(k, -1)} className="w-7 h-7 rounded-md bg-secondary text-foreground font-bold">−</button>
              <button onClick={() => bump(k, 1)} className="w-7 h-7 rounded-md bg-primary text-primary-foreground font-bold">+</button>
            </div>
          </div>
        ))}
      </div>

      {/* Live simulation scene */}
      <div className="relative h-40 rounded-xl border border-border overflow-hidden bg-gradient-to-b from-primary/20 via-background/50 to-background/90">
        {/* sun */}
        <motion.div
          className="absolute right-4 top-3 text-xl"
          animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          ☀️
        </motion.div>

        {/* clouds (slow parallax) */}
        <motion.div
          className="absolute top-3 left-0 flex gap-24 text-lg opacity-60 whitespace-nowrap"
          animate={{ x: [0, -320] }}
          transition={{ duration: cloudDur, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 8 }).map((_, n) => (
            <span key={n}>☁️</span>
          ))}
        </motion.div>

        {/* hills (mid parallax) */}
        <motion.div
          className="absolute bottom-10 left-0 flex gap-10 text-2xl opacity-50 whitespace-nowrap"
          animate={{ x: [0, -240] }}
          transition={{ duration: hillDur, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 12 }).map((_, n) => (
            <span key={n}>{n % 3 === 0 ? "🏔️" : n % 3 === 1 ? "🌲" : "🏢"}</span>
          ))}
        </motion.div>

        {/* road */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-secondary/70 border-t-2 border-border" />

        {/* lane dashes (fast parallax) */}
        <motion.div
          className="absolute bottom-5 left-0 flex gap-6 whitespace-nowrap"
          animate={{ x: [0, -96] }}
          transition={{ duration: roadDur, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 40 }).map((_, n) => (
            <span key={n} className="inline-block w-10 h-1 rounded-full bg-muted-foreground/50" />
          ))}
        </motion.div>

        {/* roadside markers */}
        <motion.div
          className="absolute bottom-11 left-0 flex gap-24 whitespace-nowrap text-[10px] font-mono text-muted-foreground/70"
          animate={{ x: [0, -288] }}
          transition={{ duration: roadDur * 3, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 14 }).map((_, n) => (
            <span key={n}>🚩</span>
          ))}
        </motion.div>

        {/* car */}
        <motion.div
          className="absolute bottom-6 left-6 flex items-end gap-1"
          animate={{ y: [0, -1.5 - i * 2, 0], rotate: [0, -1 - i * 2, 0, 1 + i * 2, 0] }}
          transition={{ duration: Math.max(0.18, 0.5 - i * 0.3), repeat: Infinity, ease: "easeInOut" }}
        >
          {/* speed lines */}
          <motion.div
            className="flex flex-col gap-1 pb-3"
            animate={{ opacity: [0.1, 0.2 + i * 0.8, 0.1], x: [0, -4 - i * 8, 0] }}
            transition={{ duration: Math.max(0.12, 0.9 - i * 0.75), repeat: Infinity }}
          >
            <span className="block h-0.5 rounded-full bg-accent/80" style={{ width: 10 + i * 26 }} />
            <span className="block h-0.5 rounded-full bg-accent/60" style={{ width: 6 + i * 20 }} />
            <span className="block h-0.5 rounded-full bg-accent/40" style={{ width: 4 + i * 14 }} />
          </motion.div>

          <div className="relative">
            <span className="text-3xl leading-none block">🏎️</span>
            {/* spinning wheels */}
            <motion.span
              className="absolute -bottom-1 left-1 text-[9px]"
              animate={{ rotate: 360 }}
              transition={{ duration: wheelDur, repeat: Infinity, ease: "linear" }}
            >
              ⚫
            </motion.span>
            <motion.span
              className="absolute -bottom-1 right-1 text-[9px]"
              animate={{ rotate: 360 }}
              transition={{ duration: wheelDur, repeat: Infinity, ease: "linear" }}
            >
              ⚫
            </motion.span>
          </div>

          {/* dust puffs */}
          <motion.span
            className="text-xs pb-1"
            animate={{ opacity: [0, 0.2 + i * 0.7, 0], x: [0, 10 + i * 14], y: [0, -6] }}
            transition={{ duration: Math.max(0.3, 1.2 - i), repeat: Infinity }}
          >
            💨
          </motion.span>
        </motion.div>

        {/* speedometer badge */}
        <div className="absolute top-2 left-3 flex items-center gap-1.5 rounded-full bg-background/70 border border-border px-2.5 py-1 backdrop-blur">
          <Gauge className="w-3 h-3 text-primary" />
          <span className="text-[10px] font-mono text-foreground">
            {out.label}: {out.value}
          </span>
        </div>

        {/* intensity bar */}
        <div className="absolute top-9 left-3 w-28 h-1.5 rounded-full bg-border overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            animate={{ width: `${Math.round(i * 100)}%` }}
            transition={{ type: "spring", stiffness: 140, damping: 18 }}
          />
        </div>
      </div>

      {/* Derived readouts */}
      <div className="grid grid-cols-3 gap-2">
        {out.extras.map((e) => (
          <div key={e.label} className="rounded-lg border border-border bg-background/60 px-3 py-2 text-center">
            <p className="text-[10px] text-muted-foreground leading-tight">{e.label}</p>
            <motion.p key={e.value} initial={{ scale: 1.15, opacity: 0.6 }} animate={{ scale: 1, opacity: 1 }} className="font-display font-bold text-sm text-foreground">
              {e.value}
            </motion.p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3">
        <p className="text-xs text-muted-foreground font-mono">{out.formula}</p>
        <motion.p key={out.value} initial={{ scale: 1.1 }} animate={{ scale: 1 }} className="font-display font-bold text-lg text-primary">
          {out.label}: {out.value}
        </motion.p>
      </div>
    </div>
  );
};

export default PhysicsLab;
