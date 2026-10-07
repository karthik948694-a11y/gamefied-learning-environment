import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface StreakCounterProps {
  streak: number;
  dailyGoalMet: boolean;
}

const StreakCounter = ({ streak, dailyGoalMet }: StreakCounterProps) => {
  return (
    <motion.div
      className="flex items-center gap-2"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <div className="relative">
        <Flame
          className={`w-8 h-8 ${
            streak > 0 ? "text-streak animate-fire" : "text-muted-foreground"
          }`}
        />
        {streak >= 7 && (
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-bold font-display text-streak">
          {streak}
        </span>
        <span className="text-xs text-muted-foreground leading-none">
          {dailyGoalMet ? "🔥 On fire!" : "day streak"}
        </span>
      </div>
    </motion.div>
  );
};

export default StreakCounter;
