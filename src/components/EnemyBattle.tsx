import { motion } from "framer-motion";
import { Heart, Swords } from "lucide-react";

interface EnemyBattleProps {
  name: string;
  level: number;
  healthPercent: number;
  defeated?: boolean;
}

const EnemyBattle = ({ name, level, healthPercent, defeated }: EnemyBattleProps) => {
  return (
    <motion.div
      className={`game-card border ${
        defeated ? "border-xp/40 opacity-60" : "border-enemy/40"
      } text-center`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className="flex flex-col items-center gap-2">
        <motion.div
          className="text-6xl"
          animate={defeated ? { rotate: 90, opacity: 0.5 } : { y: [0, -6, 0] }}
          transition={defeated ? { duration: 0.5 } : { duration: 2, repeat: Infinity }}
        >
          {({ 1: "👾", 2: "🐲", 3: "🧟", 4: "👹", 5: "💀" } as Record<number, string>)[level] || "👹"}
        </motion.div>

        <h4 className={`font-display font-bold ${defeated ? "text-xp line-through" : "text-enemy"}`}>
          {name}
        </h4>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Swords className="w-3 h-3" /> Level {level}
        </span>

        {!defeated && (
          <div className="w-full mt-2">
            <div className="flex items-center gap-1 justify-center text-xs text-enemy mb-1">
              <Heart className="w-3 h-3" />
              <span>{healthPercent}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-enemy rounded-full"
                initial={{ width: "100%" }}
                animate={{ width: `${healthPercent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        )}

        {defeated && (
          <span className="text-xs text-xp font-bold">✓ DEFEATED</span>
        )}
      </div>
    </motion.div>
  );
};

export default EnemyBattle;
