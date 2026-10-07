import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, ArrowLeft, ChevronRight, Lightbulb } from "lucide-react";
import { theoryData, type ChapterTheory } from "@/lib/theoryData";
import PhysicsLab from "@/components/labs/PhysicsLab";
import ChemistryLab from "@/components/labs/ChemistryLab";
import PythonLab from "@/components/labs/PythonLab";

interface TheoryPanelProps {
  chapterId: string;
  chapterName: string;
  onClose: () => void;
  onStartQuiz: () => void;
  retrying?: boolean;
}

const TheoryPanel = ({ chapterId, chapterName, onClose, onStartQuiz, retrying }: TheoryPanelProps) => {
  const theory: ChapterTheory | undefined = theoryData[chapterId];

  if (!theory) {
    return (
      <div className="game-card border border-primary/30 flex flex-col items-center gap-4 py-10">
        <BookOpen className="w-10 h-10 text-muted-foreground" />
        <p className="text-muted-foreground text-sm">No theory notes yet for this chapter.</p>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={onStartQuiz}
          className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-display font-bold text-sm flex items-center gap-2"
        >
          Start Quiz <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col gap-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg text-foreground">{chapterName}</h3>
            <p className="text-xs text-muted-foreground">Theory Notes</p>
          </div>
        </div>
      </div>


      {retrying && (
        <div className="game-card border border-enemy/40 bg-enemy/5 py-3 px-4">
          <p className="text-sm text-enemy font-medium">
            Wrong answer — revise the notes below, then retry the question.
          </p>
        </div>
      )}

      {/* Summary banner */}
      <div className="game-card border border-primary/25 bg-primary/5 py-3 px-4">
        <p className="text-sm text-foreground/90 leading-relaxed">{theory.summary}</p>
      </div>

      {/* Interactive labs */}
      {chapterId.startsWith("phy-") && <PhysicsLab chapterId={chapterId} />}
      {chapterId.startsWith("chem-") && <ChemistryLab />}
      {chapterId.startsWith("py-") && <PythonLab chapterId={chapterId} />}


      {/* Theory points */}
      <div className="flex flex-col gap-3">
        {theory.points.map((point, i) => (
          <motion.div
            key={point.title}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            className="game-card border border-border hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold shrink-0">
                {i + 1}
              </span>
              <h4 className="font-display font-bold text-sm text-foreground">{point.title}</h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-2">{point.content}</p>
            {point.code && (
              <div className="bg-background/70 border border-border rounded-lg p-3 overflow-x-auto">
                <pre className="text-xs text-accent font-mono whitespace-pre leading-relaxed">
                  {point.code}
                </pre>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Pro tip */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-accent/8 border border-accent/25">
        <Lightbulb className="w-4 h-4 text-accent shrink-0 mt-0.5" />
        <p className="text-sm text-accent/90 leading-relaxed">{theory.tip}</p>
      </div>

      {/* CTA */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onStartQuiz}
        className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-display font-bold text-base flex items-center justify-center gap-2 glow-primary"
      >
        {retrying ? "🔁 Retry Question" : "⚔️ Start Quiz"} <ChevronRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};

export default TheoryPanel;
