import { motion } from "framer-motion";
import { Shield, Swords, Lock } from "lucide-react";
import type { Subject } from "@/lib/gameData";
import { useNavigate } from "react-router-dom";

interface SubjectCardProps {
  subject: Subject;
  index: number;
}

const colorMap = {
  primary: {
    border: "border-primary/40",
    glow: "glow-primary",
    text: "text-primary",
    bg: "bg-primary/10",
    bar: "bg-primary",
  },
  xp: {
    border: "border-xp/40",
    glow: "glow-xp",
    text: "text-xp",
    bg: "bg-xp/10",
    bar: "bg-xp",
  },
  accent: {
    border: "border-accent/40",
    glow: "glow-accent",
    text: "text-accent",
    bg: "bg-accent/10",
    bar: "bg-accent",
  },
};

const SubjectCard = ({ subject, index }: SubjectCardProps) => {
  const navigate = useNavigate();
  const progress = Math.round(
    (subject.completedQuestions / subject.totalQuestions) * 100
  );
  const colors = colorMap[subject.color];
  const currentChapter = subject.chapters.find((ch) => !ch.isCompleted && !ch.isLocked);
  const completedChapters = subject.chapters.filter((ch) => ch.isCompleted).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -4 }}
      onClick={() => navigate(`/quest/${subject.id}`)}
      className={`game-card cursor-pointer border ${colors.border} hover:${colors.glow} transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{subject.icon}</span>
          <div>
            <h3 className={`font-display font-bold text-lg ${colors.text}`}>
              {subject.name}
            </h3>
            <p className="text-sm text-muted-foreground">{subject.description}</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">Progress</span>
          <span className={`font-bold ${colors.text}`}>{progress}%</span>
        </div>
        <div className="h-3 bg-secondary rounded-full overflow-hidden">
          <div
            className={`progress-bar-fill ${colors.bar}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Shield className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">
            Ch. {completedChapters}/{subject.chapters.length}
          </span>
        </div>

        {currentChapter ? (
          <div className="flex items-center gap-2 text-sm">
            <Swords className={`w-4 h-4 ${colors.text}`} />
            <span className={colors.text}>
              {subject.enemyName} Lv.{currentChapter.enemyLevel}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="w-4 h-4" />
            <span>All cleared!</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SubjectCard;
