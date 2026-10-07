import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, RotateCcw, Sparkles } from "lucide-react";

interface Chemical {
  id: string;
  name: string;
  formula: string;
  color: string;
  emoji: string;
}

const chemicals: Chemical[] = [
  { id: "na", name: "Sodium", formula: "Na", color: "hsl(48 90% 60%)", emoji: "🧂" },
  { id: "cl", name: "Chlorine", formula: "Cl₂", color: "hsl(80 60% 55%)", emoji: "🟢" },
  { id: "h", name: "Hydrogen", formula: "H₂", color: "hsl(200 80% 70%)", emoji: "💧" },
  { id: "o", name: "Oxygen", formula: "O₂", color: "hsl(190 70% 60%)", emoji: "🫧" },
  { id: "fe", name: "Iron", formula: "Fe", color: "hsl(0 0% 60%)", emoji: "⚙️" },
  { id: "cu", name: "Copper sulphate", formula: "CuSO₄", color: "hsl(215 80% 55%)", emoji: "🔷" },
  { id: "acid", name: "Vinegar (acid)", formula: "CH₃COOH", color: "hsl(45 80% 70%)", emoji: "🍶" },
  { id: "base", name: "Baking soda", formula: "NaHCO₃", color: "hsl(0 0% 92%)", emoji: "🥄" },
  { id: "hcl", name: "Hydrochloric acid", formula: "HCl", color: "hsl(52 90% 65%)", emoji: "🧪" },
  { id: "naoh", name: "Caustic soda", formula: "NaOH", color: "hsl(280 40% 78%)", emoji: "🧼" },
  { id: "zn", name: "Zinc", formula: "Zn", color: "hsl(210 12% 70%)", emoji: "🔩" },
  { id: "mg", name: "Magnesium", formula: "Mg", color: "hsl(0 0% 96%)", emoji: "✨" },
  { id: "agno3", name: "Silver nitrate", formula: "AgNO₃", color: "hsl(0 0% 88%)", emoji: "🪙" },
  { id: "ca", name: "Quicklime", formula: "CaO", color: "hsl(38 40% 88%)", emoji: "🪨" },
  { id: "co2", name: "Carbon dioxide", formula: "CO₂", color: "hsl(0 0% 75%)", emoji: "🌫️" },
  { id: "kmno4", name: "Potassium permanganate", formula: "KMnO₄", color: "hsl(300 60% 45%)", emoji: "🟣" },
  { id: "h2o", name: "Water", formula: "H₂O", color: "hsl(200 80% 55%)", emoji: "🚰" },
];

type Effect = "fizz" | "flame" | "precipitate" | "glow" | "smoke" | "none";

interface Reaction {
  name: string;
  formula: string;
  color: string;
  emoji: string;
  note: string;
  effect: Effect;
}

// Keys are the two chemical ids sorted alphabetically and joined with "+"
const reactions: Record<string, Reaction> = {
  // ---- Sodium ----
  "cl+na": { name: "Table Salt", formula: "2Na + Cl₂ → 2NaCl", color: "hsl(0 0% 96%)", emoji: "🧂", note: "A violent metal + gas reaction makes a harmless white crystal.", effect: "flame" },
  "na+o": { name: "Sodium oxide", formula: "4Na + O₂ → 2Na₂O", color: "hsl(45 30% 90%)", emoji: "⚪", note: "Sodium tarnishes instantly in air, forming a white oxide coat.", effect: "glow" },
  "h+na": { name: "Sodium hydride", formula: "2Na + H₂ → 2NaH", color: "hsl(0 0% 85%)", emoji: "🧱", note: "Hot sodium absorbs hydrogen into a white ionic hydride.", effect: "glow" },
  "h2o+na": { name: "Sodium hydroxide + Hydrogen", formula: "2Na + 2H₂O → 2NaOH + H₂↑", color: "hsl(280 35% 80%)", emoji: "🔥", note: "Sodium skates on water and catches fire — very dangerous!", effect: "flame" },
  "hcl+na": { name: "Salt + Hydrogen", formula: "2Na + 2HCl → 2NaCl + H₂↑", color: "hsl(0 0% 92%)", emoji: "💥", note: "Extremely vigorous — hydrogen gas roars off.", effect: "flame" },
  "acid+na": { name: "Sodium acetate + Hydrogen", formula: "2Na + 2CH₃COOH → 2CH₃COONa + H₂↑", color: "hsl(48 60% 82%)", emoji: "🫧", note: "Sodium displaces hydrogen from the acid.", effect: "fizz" },
  "agno3+na": { name: "Silver + Sodium nitrate", formula: "Na + AgNO₃ → NaNO₃ + Ag", color: "hsl(45 15% 78%)", emoji: "🪞", note: "Sodium displaces silver — shiny silver metal appears.", effect: "precipitate" },
  "cu+na": { name: "Copper displaced", formula: "2Na + CuSO₄ + 2H₂O → Cu(OH)₂↓ + Na₂SO₄ + H₂↑", color: "hsl(210 70% 45%)", emoji: "🔵", note: "Sodium reacts with the water first, then precipitates blue copper hydroxide.", effect: "fizz" },
  "base+na": { name: "Sodium carbonate", formula: "2Na + 2NaHCO₃ → 2Na₂CO₃ + H₂↑", color: "hsl(0 0% 93%)", emoji: "🧴", note: "Hydrogen is released and washing soda is left behind.", effect: "fizz" },

  // ---- Chlorine ----
  "cl+h": { name: "Hydrogen chloride", formula: "H₂ + Cl₂ → 2HCl", color: "hsl(60 60% 80%)", emoji: "⚡", note: "Explosive in sunlight — dissolves in water as hydrochloric acid.", effect: "flame" },
  "cl+fe": { name: "Iron(III) chloride", formula: "2Fe + 3Cl₂ → 2FeCl₃", color: "hsl(28 65% 45%)", emoji: "🟫", note: "Hot iron wool burns in chlorine giving brown ferric chloride.", effect: "flame" },
  "cl+zn": { name: "Zinc chloride", formula: "Zn + Cl₂ → ZnCl₂", color: "hsl(0 0% 90%)", emoji: "⬜", note: "A bright reaction producing a white deliquescent salt.", effect: "flame" },
  "cl+mg": { name: "Magnesium chloride", formula: "Mg + Cl₂ → MgCl₂", color: "hsl(0 0% 95%)", emoji: "🔥", note: "Magnesium burns fiercely in chlorine gas.", effect: "flame" },
  "cl+naoh": { name: "Bleach", formula: "Cl₂ + 2NaOH → NaCl + NaOCl + H₂O", color: "hsl(55 60% 88%)", emoji: "🧽", note: "Cold dilute alkali + chlorine gives household bleach.", effect: "glow" },
  "cl+h2o": { name: "Chlorine water", formula: "Cl₂ + H₂O → HCl + HOCl", color: "hsl(65 55% 75%)", emoji: "🟡", note: "Pale yellow chlorine water — it bleaches litmus paper.", effect: "fizz" },
  "ca+cl": { name: "Bleaching powder", formula: "Ca(OH)₂ + Cl₂ → CaOCl₂ + H₂O", color: "hsl(50 30% 90%)", emoji: "🧼", note: "Used to disinfect drinking water.", effect: "smoke" },
  "cl+cu": { name: "Copper chloride", formula: "Cu + Cl₂ → CuCl₂", color: "hsl(150 55% 45%)", emoji: "🟩", note: "Copper burns in chlorine with a green-blue flame.", effect: "flame" },

  // ---- Hydrogen / Oxygen ----
  "h+o": { name: "Water", formula: "2H₂ + O₂ → 2H₂O", color: "hsl(200 85% 62%)", emoji: "💦", note: "Highly exothermic — a loud pop and water droplets form.", effect: "flame" },
  "fe+o": { name: "Rust", formula: "4Fe + 3O₂ → 2Fe₂O₃", color: "hsl(22 70% 45%)", emoji: "🟤", note: "Slow oxidation turns shiny iron orange-brown.", effect: "precipitate" },
  "mg+o": { name: "Magnesium oxide", formula: "2Mg + O₂ → 2MgO", color: "hsl(0 0% 99%)", emoji: "🔥", note: "Blinding white flame! Classic combustion — never look straight at it.", effect: "flame" },
  "o+zn": { name: "Zinc oxide", formula: "2Zn + O₂ → 2ZnO", color: "hsl(50 25% 92%)", emoji: "🟨", note: "Yellow when hot, white when cold — a famous amphoteric oxide.", effect: "glow" },
  "ca+o": { name: "Quicklime stays quicklime", formula: "CaO + O₂ → no further oxidation", color: "hsl(38 40% 88%)", emoji: "🪨", note: "Calcium is already fully oxidised in CaO.", effect: "none" },

  // ---- Iron ----
  "cu+fe": { name: "Iron sulphate + Copper", formula: "Fe + CuSO₄ → FeSO₄ + Cu", color: "hsl(120 40% 45%)", emoji: "🟩", note: "Displacement: blue fades to pale green as copper deposits.", effect: "precipitate" },
  "fe+hcl": { name: "Iron chloride + Hydrogen", formula: "Fe + 2HCl → FeCl₂ + H₂↑", color: "hsl(95 35% 55%)", emoji: "🟢", note: "Pale green solution with steady hydrogen bubbles.", effect: "fizz" },
  "agno3+fe": { name: "Silver displaced", formula: "Fe + 2AgNO₃ → Fe(NO₃)₂ + 2Ag", color: "hsl(45 12% 80%)", emoji: "🪙", note: "Grey silver crystals coat the iron nail.", effect: "precipitate" },
  "fe+h2o": { name: "Iron oxide + Hydrogen", formula: "3Fe + 4H₂O(steam) → Fe₃O₄ + 4H₂↑", color: "hsl(0 0% 25%)", emoji: "⚫", note: "Red-hot iron with steam gives black magnetic oxide.", effect: "smoke" },
  "acid+fe": { name: "Iron acetate + Hydrogen", formula: "Fe + 2CH₃COOH → (CH₃COO)₂Fe + H₂↑", color: "hsl(35 45% 55%)", emoji: "🫧", note: "Slow fizzing — vinegar is a weak acid.", effect: "fizz" },

  // ---- Copper sulphate ----
  "cu+zn": { name: "Zinc sulphate + Copper", formula: "Zn + CuSO₄ → ZnSO₄ + Cu", color: "hsl(0 0% 90%)", emoji: "🟠", note: "Blue colour disappears and reddish copper settles out.", effect: "precipitate" },
  "cu+mg": { name: "Magnesium sulphate + Copper", formula: "Mg + CuSO₄ → MgSO₄ + Cu", color: "hsl(0 0% 92%)", emoji: "🟤", note: "Even faster than zinc — magnesium is more reactive.", effect: "precipitate" },
  "cu+naoh": { name: "Copper hydroxide", formula: "CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄", color: "hsl(210 70% 45%)", emoji: "🔵", note: "A pale blue gel-like precipitate drops out of solution.", effect: "precipitate" },
  "base+cu": { name: "Copper carbonate", formula: "CuSO₄ + 2NaHCO₃ → CuCO₃↓ + Na₂SO₄ + H₂O + CO₂↑", color: "hsl(170 45% 45%)", emoji: "🟩", note: "Green-blue precipitate plus fizzing carbon dioxide.", effect: "fizz" },
  "cu+h2o": { name: "Blue solution", formula: "CuSO₄ + 5H₂O → CuSO₄·5H₂O", color: "hsl(215 85% 55%)", emoji: "🔷", note: "White anhydrous salt turns brilliant blue when hydrated.", effect: "glow" },

  // ---- Acids & bases ----
  "acid+base": { name: "Sodium acetate + CO₂", formula: "CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂↑", color: "hsl(50 90% 75%)", emoji: "🫧", note: "It fizzes! Carbon dioxide gas bubbles out.", effect: "fizz" },
  "hcl+naoh": { name: "Neutralisation", formula: "HCl + NaOH → NaCl + H₂O", color: "hsl(0 0% 94%)", emoji: "⚖️", note: "Acid + base → salt + water. The beaker warms up and pH goes to 7.", effect: "glow" },
  "acid+naoh": { name: "Sodium acetate", formula: "CH₃COOH + NaOH → CH₃COONa + H₂O", color: "hsl(48 55% 88%)", emoji: "⚖️", note: "Weak acid neutralised by a strong base.", effect: "glow" },
  "base+hcl": { name: "Fizzing salt", formula: "NaHCO₃ + HCl → NaCl + H₂O + CO₂↑", color: "hsl(45 80% 85%)", emoji: "🫧", note: "Instant fizz — the classic volcano experiment.", effect: "fizz" },
  "hcl+zn": { name: "Zinc chloride + Hydrogen", formula: "Zn + 2HCl → ZnCl₂ + H₂↑", color: "hsl(190 40% 80%)", emoji: "🎈", note: "Bubbles of hydrogen gas pop out — it burns with a squeaky pop!", effect: "fizz" },
  "hcl+mg": { name: "Magnesium chloride + Hydrogen", formula: "Mg + 2HCl → MgCl₂ + H₂↑", color: "hsl(160 45% 75%)", emoji: "💨", note: "Faster than zinc — magnesium is higher in the reactivity series.", effect: "fizz" },
  "acid+zn": { name: "Zinc acetate + Hydrogen", formula: "Zn + 2CH₃COOH → (CH₃COO)₂Zn + H₂↑", color: "hsl(180 30% 82%)", emoji: "🫧", note: "Gentle bubbling as hydrogen escapes.", effect: "fizz" },
  "acid+mg": { name: "Magnesium acetate + Hydrogen", formula: "Mg + 2CH₃COOH → (CH₃COO)₂Mg + H₂↑", color: "hsl(150 35% 82%)", emoji: "🎈", note: "Brisk fizzing — magnesium loves acids.", effect: "fizz" },
  "naoh+zn": { name: "Sodium zincate + Hydrogen", formula: "Zn + 2NaOH → Na₂ZnO₂ + H₂↑", color: "hsl(210 20% 85%)", emoji: "🫧", note: "Zinc is amphoteric — it reacts with alkalis too!", effect: "fizz" },
  "ca+hcl": { name: "Calcium chloride", formula: "CaO + 2HCl → CaCl₂ + H₂O", color: "hsl(0 0% 95%)", emoji: "♨️", note: "A basic oxide neutralised by acid, giving off heat.", effect: "smoke" },
  "acid+ca": { name: "Calcium acetate", formula: "CaO + 2CH₃COOH → (CH₃COO)₂Ca + H₂O", color: "hsl(40 40% 88%)", emoji: "⚖️", note: "The basic oxide neutralises vinegar.", effect: "glow" },
  "h2o+hcl": { name: "Dilute acid", formula: "HCl + H₂O → H₃O⁺ + Cl⁻", color: "hsl(52 70% 78%)", emoji: "🌡️", note: "Always add acid to water — dilution releases heat.", effect: "smoke" },
  "h2o+naoh": { name: "Alkali solution", formula: "NaOH + H₂O → Na⁺ + OH⁻ (aq)", color: "hsl(280 35% 85%)", emoji: "♨️", note: "The pellets dissolve and the beaker gets hot.", effect: "smoke" },
  "base+h2o": { name: "Mild alkali", formula: "NaHCO₃ + H₂O → Na⁺ + HCO₃⁻", color: "hsl(0 0% 95%)", emoji: "🥄", note: "A gentle alkaline solution — antacid in a glass.", effect: "none" },
  "acid+h2o": { name: "Dilute vinegar", formula: "CH₃COOH + H₂O ⇌ CH₃COO⁻ + H₃O⁺", color: "hsl(48 60% 82%)", emoji: "🍶", note: "A weak acid only partly ionises — that is why it is mild.", effect: "none" },
  "base+naoh": { name: "Washing soda", formula: "NaHCO₃ + NaOH → Na₂CO₃ + H₂O", color: "hsl(0 0% 93%)", emoji: "🧴", note: "Bicarbonate is converted into carbonate.", effect: "glow" },

  // ---- Silver nitrate ----
  "agno3+hcl": { name: "Silver chloride", formula: "AgNO₃ + HCl → AgCl↓ + HNO₃", color: "hsl(0 0% 92%)", emoji: "⬜", note: "A white curdy precipitate settles at the bottom.", effect: "precipitate" },
  "agno3+cu": { name: "Silver crystals", formula: "Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag", color: "hsl(205 60% 60%)", emoji: "🌿", note: "A silver 'tree' grows while the liquid turns blue.", effect: "precipitate" },
  "agno3+zn": { name: "Silver displaced", formula: "Zn + 2AgNO₃ → Zn(NO₃)₂ + 2Ag", color: "hsl(0 0% 82%)", emoji: "🪙", note: "Zinc is above silver, so it pushes silver out of solution.", effect: "precipitate" },
  "agno3+mg": { name: "Silver displaced", formula: "Mg + 2AgNO₃ → Mg(NO₃)₂ + 2Ag", color: "hsl(0 0% 85%)", emoji: "✨", note: "Rapid displacement — grey silver forms almost instantly.", effect: "precipitate" },
  "agno3+naoh": { name: "Silver oxide", formula: "2AgNO₃ + 2NaOH → Ag₂O↓ + 2NaNO₃ + H₂O", color: "hsl(28 35% 30%)", emoji: "🟫", note: "A brown-black precipitate of silver oxide.", effect: "precipitate" },
  "agno3+h2o": { name: "Silver nitrate solution", formula: "AgNO₃ → Ag⁺ + NO₃⁻ (aq)", color: "hsl(0 0% 88%)", emoji: "💧", note: "Colourless solution — it stains skin black in sunlight.", effect: "none" },

  // ---- Lime & CO₂ ----
  "ca+h2o": { name: "Slaked lime", formula: "CaO + H₂O → Ca(OH)₂", color: "hsl(0 0% 90%)", emoji: "♨️", note: "Very exothermic — the water hisses and steams.", effect: "smoke" },
  "ca+co2": { name: "Limestone", formula: "CaO + CO₂ → CaCO₃", color: "hsl(40 25% 85%)", emoji: "🪨", note: "This is how lime water turns milky in the CO₂ test.", effect: "precipitate" },
  "co2+naoh": { name: "Washing soda", formula: "CO₂ + 2NaOH → Na₂CO₃ + H₂O", color: "hsl(0 0% 93%)", emoji: "🧴", note: "Alkalis soak up carbon dioxide from the air.", effect: "glow" },
  "co2+h2o": { name: "Carbonic acid", formula: "CO₂ + H₂O ⇌ H₂CO₃", color: "hsl(190 45% 70%)", emoji: "🥤", note: "This is the fizz in every soda bottle.", effect: "fizz" },
  "co2+mg": { name: "Magnesium burns in CO₂", formula: "2Mg + CO₂ → 2MgO + C", color: "hsl(0 0% 30%)", emoji: "🔥", note: "Magnesium keeps burning in carbon dioxide, leaving black carbon!", effect: "flame" },

  // ---- Permanganate ----
  "acid+kmno4": { name: "Decolourised permanganate", formula: "KMnO₄ + acid → Mn²⁺ (colourless)", color: "hsl(300 20% 88%)", emoji: "🎨", note: "Deep purple vanishes — a redox colour change.", effect: "glow" },
  "hcl+kmno4": { name: "Chlorine gas", formula: "2KMnO₄ + 16HCl → 2KCl + 2MnCl₂ + 5Cl₂↑ + 8H₂O", color: "hsl(70 55% 65%)", emoji: "☠️", note: "Greenish chlorine gas is produced — done only in a fume hood.", effect: "smoke" },
  "kmno4+o": { name: "Strong oxidiser", formula: "2KMnO₄ → K₂MnO₄ + MnO₂ + O₂↑", color: "hsl(300 55% 40%)", emoji: "🟪", note: "On heating it releases oxygen — a powerful oxidising agent.", effect: "glow" },
  "h2o+kmno4": { name: "Purple solution", formula: "KMnO₄ → K⁺ + MnO₄⁻ (aq)", color: "hsl(300 65% 40%)", emoji: "🟣", note: "One crystal colours a whole beaker deep purple.", effect: "glow" },
  "kmno4+naoh": { name: "Green manganate", formula: "4KMnO₄ + 4NaOH → 4K/NaMnO₄ + O₂↑ + 2H₂O", color: "hsl(140 55% 40%)", emoji: "🟢", note: "Purple turns green as manganate(VI) forms in alkali.", effect: "glow" },
  "kmno4+zn": { name: "Permanganate reduced", formula: "Zn + KMnO₄ → MnO₂↓ + Zn²⁺", color: "hsl(25 35% 30%)", emoji: "🟤", note: "Purple fades to a brown MnO₂ sludge.", effect: "precipitate" },
  "fe+kmno4": { name: "Iron oxidised", formula: "MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O", color: "hsl(35 60% 60%)", emoji: "🧪", note: "The classic redox titration — purple disappears at the endpoint.", effect: "glow" },

  // ---- Zinc / Magnesium with water ----
  "h2o+zn": { name: "Zinc oxide + Hydrogen", formula: "Zn + H₂O(steam) → ZnO + H₂↑", color: "hsl(50 25% 90%)", emoji: "💨", note: "Only red-hot zinc reacts with steam.", effect: "smoke" },
  "h2o+mg": { name: "Magnesium hydroxide", formula: "Mg + 2H₂O(hot) → Mg(OH)₂ + H₂↑", color: "hsl(0 0% 94%)", emoji: "🫧", note: "Slow in cold water, brisk in hot water.", effect: "fizz" },
};



// water pseudo-chemical mapping (H₂ + O₂ shortcut ids used in keys above)
const aliasKey = (a: string, b: string) => [a, b].sort().join("+");

const ChemistryLab = () => {
  const [picked, setPicked] = useState<Chemical[]>([]);
  const [result, setResult] = useState<Reaction | null>(null);
  const [mixing, setMixing] = useState(false);

  const toggle = (c: Chemical) => {
    setResult(null);
    setPicked((p) => {
      if (p.find((x) => x.id === c.id)) return p.filter((x) => x.id !== c.id);
      if (p.length === 2) return [p[1], c];
      return [...p, c];
    });
  };

  const mix = () => {
    if (picked.length !== 2) return;
    setMixing(true);
    setResult(null);
    const key = aliasKey(picked[0].id, picked[1].id);
    window.setTimeout(() => {
      setResult(
        reactions[key] ?? {
          name: "No reaction",
          formula: `${picked[0].formula} + ${picked[1].formula} → no change`,
          color: "hsl(0 0% 70%)",
          emoji: "🤷",
          note: "Try another pair — not every mix makes a new compound.",
          effect: "none",
        }
      );
      setMixing(false);
    }, 900);
  };

  const beakerColor = result ? result.color : picked.length ? picked[picked.length - 1].color : "hsl(210 20% 30%)";
  const effect = result?.effect ?? "none";
  const discovered = Object.keys(reactions).length;

  return (
    <div className="game-card border border-accent/30 bg-gradient-to-br from-accent/10 to-primary/5 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2">
        <h4 className="font-display font-bold text-sm text-accent flex items-center gap-2">
          <FlaskConical className="w-4 h-4" /> Mixing Lab — pick two chemicals, then mix
        </h4>
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-[10px] text-muted-foreground font-mono">{discovered} reactions</span>
          <button onClick={() => { setPicked([]); setResult(null); }} className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {chemicals.map((c) => {
          const active = !!picked.find((x) => x.id === c.id);
          return (
            <motion.button
              key={c.id}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.06, y: -2 }}
              onClick={() => toggle(c)}
              className={`relative flex flex-col items-center gap-1 rounded-xl border p-2 transition-colors ${
                active ? "border-primary bg-primary/15 shadow-lg" : "border-border bg-background/60 hover:border-primary/40"
              }`}
              style={active ? { boxShadow: `0 0 18px -4px ${c.color}` } : undefined}
            >
              <span className="text-2xl drop-shadow">{c.emoji}</span>
              <span className="text-[9px] text-muted-foreground leading-tight text-center line-clamp-2">{c.name}</span>
              <span className="text-[10px] font-mono text-foreground">{c.formula}</span>
              <span className="absolute inset-x-2 bottom-1 h-0.5 rounded-full" style={{ background: c.color, opacity: active ? 1 : 0.25 }} />
            </motion.button>
          );
        })}
      </div>

      {/* Selection strip */}
      <div className="flex items-center justify-center gap-3 text-sm">
        <span className="px-3 py-1.5 rounded-lg border border-border bg-background/60 font-mono text-xs min-w-20 text-center">
          {picked[0]?.formula ?? "—"}
        </span>
        <span className="text-muted-foreground">+</span>
        <span className="px-3 py-1.5 rounded-lg border border-border bg-background/60 font-mono text-xs min-w-20 text-center">
          {picked[1]?.formula ?? "—"}
        </span>
        <span className="text-muted-foreground">→</span>
        <span className="px-3 py-1.5 rounded-lg border border-primary/40 bg-primary/10 font-mono text-xs min-w-20 text-center text-primary">
          {result ? result.emoji : "?"}
        </span>
      </div>

      {/* Beaker */}
      <div className="flex items-end justify-center gap-6">
        <div className="relative w-28 h-36 rounded-b-3xl rounded-t-lg border-2 border-border/80 overflow-hidden bg-background/40 backdrop-blur">
          {/* glass shine */}
          <div className="absolute left-2 top-3 bottom-6 w-2 rounded-full bg-foreground/10" />
          {/* liquid */}
          <motion.div
            className="absolute bottom-0 left-0 right-0"
            animate={{ backgroundColor: beakerColor, height: picked.length ? "68%" : "32%" }}
            transition={{ duration: 0.6 }}
          >
            {/* surface wobble */}
            <motion.div
              className="absolute -top-1 left-0 right-0 h-2 rounded-[50%]"
              style={{ background: beakerColor }}
              animate={{ scaleX: [1, 1.05, 1], y: [0, -1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* swirl while mixing */}
          {mixing && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center text-2xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
            >
              🌀
            </motion.div>
          )}

          {/* bubbles */}
          {(effect === "fizz" || mixing) && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute rounded-full bg-foreground/50"
                  style={{ left: `${8 + i * 7}%`, width: 4 + (i % 3) * 3, height: 4 + (i % 3) * 3 }}
                  initial={{ bottom: 0, opacity: 0 }}
                  animate={{ bottom: ["5%", "85%"], opacity: [0, 0.9, 0] }}
                  transition={{ duration: 1 + (i % 4) * 0.3, repeat: Infinity, delay: i * 0.12 }}
                />
              ))}
            </div>
          )}

          {/* flame flash */}
          {effect === "flame" && (
            <motion.div
              className="absolute inset-0"
              style={{ background: "radial-gradient(circle at 50% 70%, hsl(40 100% 70% / 0.85), transparent 65%)" }}
              animate={{ opacity: [0.3, 1, 0.4] }}
              transition={{ duration: 0.7, repeat: Infinity }}
            />
          )}

          {/* glow pulse */}
          {effect === "glow" && (
            <motion.div
              className="absolute inset-0"
              style={{ background: `radial-gradient(circle, ${beakerColor}, transparent 70%)` }}
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            />
          )}

          {/* precipitate falling */}
          {effect === "precipitate" && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute rounded-sm"
                  style={{ left: `${10 + i * 8}%`, width: 5, height: 5, background: beakerColor, filter: "brightness(0.75)" }}
                  initial={{ top: "20%", opacity: 0 }}
                  animate={{ top: ["20%", "88%"], opacity: [0, 1, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.18 }}
                />
              ))}
            </div>
          )}

          {/* smoke / steam */}
          {effect === "smoke" && (
            <div className="absolute inset-x-0 top-0 h-full pointer-events-none">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-lg"
                  style={{ left: `${12 + i * 18}%` }}
                  initial={{ top: "45%", opacity: 0 }}
                  animate={{ top: ["45%", "-10%"], opacity: [0, 0.7, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                >
                  💨
                </motion.span>
              ))}
            </div>
          )}

          <AnimatePresence>
            {result && !mixing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 14 }}
                className="absolute inset-0 flex items-center justify-center text-4xl drop-shadow-lg"
              >
                {result.emoji}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.04 }}
          disabled={picked.length !== 2 || mixing}
          onClick={mix}
          className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-display font-bold text-sm disabled:opacity-40 flex items-center gap-2 glow-primary"
        >
          <Sparkles className="w-4 h-4" /> {mixing ? "Mixing…" : "Mix"}
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {result && !mixing && (
          <motion.div
            key={result.name}
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3"
          >
            <p className="font-display font-bold text-primary">{result.emoji} {result.name}</p>
            <p className="text-xs font-mono text-foreground/90 mt-1">{result.formula}</p>
            <p className="text-xs text-muted-foreground mt-1">{result.note}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-[10px] text-muted-foreground text-center">
        Tip: try Mg + O₂, Zn + HCl, CuSO₄ + NaOH, AgNO₃ + HCl, CaO + CO₂…
      </p>
    </div>
  );
};

export default ChemistryLab;
