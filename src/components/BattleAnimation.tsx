import { motion, AnimatePresence } from "framer-motion";
import type { EquippedCostume } from "@/components/CharacterDisplay";

interface BattleAnimationProps {
  result: "correct" | "wrong" | null;
  onComplete: () => void;
  equipped?: EquippedCostume;
  enemyLevel?: number;
}

const ENEMY_FACES: Record<number, string> = { 1: "👾", 2: "🐲", 3: "🧟", 4: "👹", 5: "💀" };

const SPARKS = Array.from({ length: 18 }, (_, i) => i);

const BattleAnimation = ({ result, onComplete, equipped, enemyLevel = 4 }: BattleAnimationProps) => {
  if (!result) return null;

  const win = result === "correct";
  const accent = win ? "hsl(var(--primary))" : "hsl(var(--enemy))";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-background/95 backdrop-blur-md"
        onClick={onComplete}
      >
        {/* Impact flash */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 45%, ${accent}, transparent 60%)` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, win ? 0.45 : 0.35, 0.12] }}
          transition={{ duration: 0.7, times: [0, 0.15, 1] }}
        />

        {/* Radiating rings */}
        {[0, 1, 2].map((r) => (
          <motion.div
            key={r}
            className="absolute rounded-full border-2 pointer-events-none"
            style={{ borderColor: accent, width: 220, height: 220 }}
            initial={{ scale: 0.3, opacity: 0.7 }}
            animate={{ scale: 4.5, opacity: 0 }}
            transition={{ duration: 1.6, delay: 0.15 + r * 0.25, ease: "easeOut" }}
          />
        ))}

        {/* Sparks / embers */}
        {SPARKS.map((i) => {
          const angle = (i / SPARKS.length) * Math.PI * 2;
          const dist = 160 + (i % 5) * 45;
          return (
            <motion.span
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 6 + (i % 3) * 4,
                height: 6 + (i % 3) * 4,
                background: win && i % 3 === 0 ? "hsl(var(--coin))" : accent,
                boxShadow: `0 0 14px ${accent}`,
              }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
              animate={{
                x: Math.cos(angle) * dist,
                y: Math.sin(angle) * dist + (win ? 60 : 0),
                opacity: [0, 1, 0],
                scale: [0.4, 1.1, 0.2],
              }}
              transition={{ duration: 1.3, delay: 0.2 + (i % 6) * 0.04, ease: "easeOut" }}
            />
          );
        })}

        <div className="relative flex flex-col items-center gap-6 px-4">
          <div className="relative flex items-center gap-4 sm:gap-10">
            {/* Hero */}
            <motion.div
              className="relative"
              initial={{ x: -160, opacity: 0, rotate: -6 }}
              animate={
                win
                  ? { x: [0, 26, 0], opacity: 1, rotate: 0, scale: [1, 1.12, 1] }
                  : { x: 0, opacity: 1, rotate: [0, -4, 4, 0], scale: [1, 0.94, 1] }
              }
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="relative flex flex-col items-center leading-none">
                <span className="text-6xl sm:text-8xl">{equipped?.head || "🛡️"}</span>
                <span className="text-6xl sm:text-8xl -mt-2">{equipped?.body || "🦸"}</span>
              </div>
              <motion.div
                className="absolute -inset-4 rounded-full pointer-events-none"
                animate={{ boxShadow: [`0 0 0px ${accent}00`, `0 0 70px ${accent}`, `0 0 20px ${accent}80`] }}
                transition={{ duration: 1, times: [0, 0.3, 1] }}
              />
            </motion.div>




            {/* Enemy */}
            <motion.div
              className="relative"
              initial={{ x: 160, opacity: 0, rotate: 6 }}
              animate={
                win
                  ? { x: [0, 30, 14], opacity: [1, 1, 0.75], rotate: [0, 10, 6], scale: [1, 0.88, 0.7] }
                  : { x: [0, -26, 0], opacity: 1, rotate: 0, scale: [1, 1.12, 1] }
              }
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="text-6xl sm:text-8xl leading-none">
                {ENEMY_FACES[enemyLevel] || "👹"}
              </span>
            </motion.div>
          </div>

          {/* Verdict banner */}
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.85 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 16 }}
            className="relative rounded-2xl border px-7 py-4 text-center backdrop-blur-sm"
            style={{
              borderColor: accent,
              background: `linear-gradient(180deg, ${accent}22, transparent)`,
              boxShadow: `0 0 40px ${accent}55`,
            }}
          >
            <motion.h2
              className={`font-display text-2xl sm:text-4xl font-black tracking-widest ${
                win ? "text-primary text-glow-primary" : "text-enemy"
              }`}
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              {win ? "CRITICAL HIT!" : "YOU'RE HIT!"}
            </motion.h2>
            <p className={`mt-1 font-body text-sm sm:text-base font-semibold ${win ? "text-xp" : "text-muted-foreground"}`}>
              {win ? "Perfect answer — the enemy staggers back." : "Wrong answer — shake it off and strike again."}
            </p>
          </motion.div>
        </div>

        <motion.p
          className="absolute bottom-10 text-xs sm:text-sm tracking-wide text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5, 1] }}
          transition={{ delay: 1.1, duration: 2, repeat: Infinity }}
        >
          Tap anywhere to continue
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default BattleAnimation;
