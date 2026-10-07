import { motion } from "framer-motion";
import { Check, Lock, Swords } from "lucide-react";
import type { Chapter } from "@/lib/gameData";

interface QuestMapProps {
  chapters: Chapter[];
  onSelectChapter: (chapter: Chapter) => void;
}

const QuestMap = ({ chapters, onSelectChapter }: QuestMapProps) => {
  return (
    <div className="flex flex-col items-center gap-2 py-4">
      {chapters.map((chapter, index) => (
        <div key={chapter.id} className="flex flex-col items-center">
          {/* Connector Line */}
          {index > 0 && (
            <div
              className={`w-0.5 h-8 ${
                chapter.isLocked ? "bg-border" : "bg-primary/40"
              }`}
            />
          )}

          {/* Quest Node */}
          <motion.button
            whileHover={!chapter.isLocked ? { scale: 1.15 } : {}}
            whileTap={!chapter.isLocked ? { scale: 0.95 } : {}}
            onClick={() => !chapter.isLocked && onSelectChapter(chapter)}
            disabled={chapter.isLocked}
            className={`quest-node ${
              chapter.isCompleted
                ? "quest-node-completed"
                : chapter.isLocked
                ? "quest-node-locked"
                : "quest-node-current"
            }`}
          >
            {chapter.isCompleted ? (
              <Check className="w-5 h-5 text-primary-foreground" />
            ) : chapter.isLocked ? (
              <Lock className="w-4 h-4 text-muted-foreground" />
            ) : (
              <Swords className="w-5 h-5 text-primary" />
            )}
          </motion.button>

          {/* Chapter Label */}
          <span
            className={`text-sm mt-1 font-body ${
              chapter.isLocked
                ? "text-muted-foreground/50"
                : chapter.isCompleted
                ? "text-xp"
                : "text-foreground"
            }`}
          >
            {chapter.name}
          </span>
          <span className="text-xs text-muted-foreground">
            Enemy Lv.{chapter.enemyLevel}
          </span>
        </div>
      ))}
    </div>
  );
};

export default QuestMap;
