import { motion } from "framer-motion";
import AnimalGuide from "@/components/kids/AnimalGuide";
import { animalGuideList } from "@/lib/animalGuides";

const AnimalGuideRow = () => (
  <div className="flex flex-wrap items-center justify-center gap-4">
    {animalGuideList.map((g, i) => (
      <motion.div
        key={g.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.08 }}
        whileHover={{ scale: 1.06 }}
        className="text-center"
        title={g.personality}
      >
        <AnimalGuide animal={g.id} size="sm" message={g.personality} showName />
      </motion.div>
    ))}
  </div>
);

export default AnimalGuideRow;
