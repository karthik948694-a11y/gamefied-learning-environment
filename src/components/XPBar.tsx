import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface XPBarProps {
  level: number;
  xp: number;
  xpToNext: number;
}

const XPBar = ({ level, xp, xpToNext }: XPBarProps) => {
  const percent = Math.round((xp / xpToNext) * 100);

  return (
    <div className="flex items-center gap-3 w-full max-w-xs">
      <div className="flex items-center gap-1 shrink-0">
        <Star className="w-5 h-5 text-accent fill-accent" />
        <span className="font-display font-bold text-accent text-lg">
          Lv.{level}
        </span>
      </div>
      <div className="flex-1">
        <div className="h-2.5 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-xp rounded-full progress-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          {xp} / {xpToNext} XP
        </p>
      </div>
    </div>
  );
};

export default XPBar;
