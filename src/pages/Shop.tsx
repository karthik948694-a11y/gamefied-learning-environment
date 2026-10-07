import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, ShoppingBag, Check, Sparkles } from "lucide-react";
import { type CostumeItem, type CostumeSlot } from "@/lib/gameData";
import { useUserStats } from "@/hooks/useUserStats";
import { useCostumes } from "@/contexts/CostumeContext";
import CharacterDisplay from "@/components/CharacterDisplay";

const rarityColors: Record<string, string> = {
  common: "text-muted-foreground border-border",
  rare: "text-primary border-primary/50",
  epic: "text-accent border-accent/50",
  legendary: "text-coin border-coin/50 glow-accent",
};

const rarityBg: Record<string, string> = {
  common: "bg-secondary",
  rare: "bg-primary/10",
  epic: "bg-accent/10",
  legendary: "bg-coin/10",
};

const slotLabels: Record<CostumeSlot, { label: string; icon: string }> = {
  head: { label: "Head", icon: "🎩" },
  body: { label: "Body", icon: "👕" },
  legs: { label: "Legs", icon: "👖" },
  accessory: { label: "Accessory", icon: "💎" },
};

const Shop = () => {
  const { stats, updateStats } = useUserStats();
  const { items, equipped, equip, purchase } = useCostumes();
  const [activeSlot, setActiveSlot] = useState<CostumeSlot>("head");
  const coins = stats?.coins ?? 0;

  const filteredItems = useMemo(
    () => items.filter((i) => i.slot === activeSlot),
    [items, activeSlot]
  );

  const handlePurchase = async (item: CostumeItem) => {
    if (coins >= item.price && !item.owned) {
      await updateStats({ coins: coins - item.price });
      purchase(item.id);
    }
  };

  const handleEquip = (item: CostumeItem) => {
    if (item.owned) equip(item.id);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="font-display text-3xl font-black text-accent text-glow-accent mb-2 flex items-center justify-center gap-3">
            <ShoppingBag className="w-8 h-8" />
            Costume Shop
          </h1>
          <div className="inline-flex items-center gap-2 bg-secondary/60 px-4 py-2 rounded-full border border-accent/30">
            <Coins className="w-5 h-5 text-coin" />
            <span className="font-display font-bold text-coin text-lg">{coins}</span>
            <span className="text-muted-foreground text-sm">coins</span>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Character Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-72 shrink-0"
          >
            <div className="game-card border border-primary/30 flex flex-col items-center py-8 sticky top-24">
              <h3 className="font-display font-bold text-primary text-sm mb-4 uppercase tracking-wider">
                Your Character
              </h3>
              <CharacterDisplay equipped={equipped} size="lg" />
              <div className="mt-6 w-full space-y-2">
                {(["head", "body", "legs", "accessory"] as CostumeSlot[]).map((slot) => {
                  const equippedItem = items.find((i) => i.slot === slot && i.equipped);
                  return (
                    <div
                      key={slot}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                        activeSlot === slot
                          ? "bg-primary/20 border border-primary/40 text-primary"
                          : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                      }`}
                      onClick={() => setActiveSlot(slot)}
                    >
                      <span>{slotLabels[slot].icon}</span>
                      <span className="font-bold uppercase">{slotLabels[slot].label}</span>
                      <span className="ml-auto text-foreground">{equippedItem?.name ?? "None"}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Shop Grid */}
          <div className="flex-1">
            {/* Slot Tabs */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {(["head", "body", "legs", "accessory"] as CostumeSlot[]).map((slot) => (
                <button
                  key={slot}
                  onClick={() => setActiveSlot(slot)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-display font-bold text-sm whitespace-nowrap transition-all ${
                    activeSlot === slot
                      ? "bg-primary text-primary-foreground glow-primary"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>{slotLabels[slot].icon}</span>
                  {slotLabels[slot].label}
                </button>
              ))}
            </div>

            {/* Items */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlot}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {filteredItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`game-card border text-center ${
                      item.equipped
                        ? "border-primary/50 glow-primary"
                        : item.owned
                        ? "border-xp/30"
                        : rarityColors[item.rarity]?.split(" ").slice(1).join(" ") || "border-border"
                    }`}
                  >
                    {/* Rarity Badge */}
                    <div className="flex justify-between items-center mb-2">
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${rarityBg[item.rarity]} ${
                          rarityColors[item.rarity]?.split(" ")[0]
                        }`}
                      >
                        {item.rarity}
                      </span>
                      {item.rarity === "legendary" && <Sparkles className="w-3 h-3 text-coin" />}
                    </div>

                    <motion.span
                      className="text-5xl block mb-3"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      {item.emoji === "none" ? "➖" : item.emoji}
                    </motion.span>
                    <h3 className="font-display font-bold text-foreground mb-1 text-sm">{item.name}</h3>
                    <p className="text-[10px] text-xp mb-2">{item.bonus}</p>

                    {item.equipped ? (
                      <span className="text-xs text-primary font-bold flex items-center justify-center gap-1">
                        <Check className="w-3 h-3" /> Equipped
                      </span>
                    ) : item.owned ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleEquip(item)}
                        className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full font-bold hover:bg-primary/30 transition-colors"
                      >
                        Equip
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handlePurchase(item)}
                        disabled={coins < item.price}
                        className={`text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1 mx-auto ${
                          coins >= item.price
                            ? "bg-accent/20 text-accent hover:bg-accent/30"
                            : "bg-secondary text-muted-foreground cursor-not-allowed"
                        } transition-colors`}
                      >
                        <Coins className="w-3 h-3" />
                        {item.price}
                      </motion.button>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
