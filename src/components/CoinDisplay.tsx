import { motion } from "framer-motion";
import { Coins } from "lucide-react";

interface CoinDisplayProps {
  coins: number;
}

const CoinDisplay = ({ coins }: CoinDisplayProps) => {
  return (
    <motion.div
      className="flex items-center gap-2 bg-secondary/60 px-3 py-1.5 rounded-full border border-accent/30"
      whileHover={{ scale: 1.05 }}
    >
      <Coins className="w-5 h-5 text-coin animate-coin-spin" />
      <span className="font-display font-bold text-coin">{coins}</span>
    </motion.div>
  );
};

export default CoinDisplay;
