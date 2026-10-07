import { pythonChapter1Questions, pythonChapter2Questions, pythonChapter3Questions, pythonChapter4Questions, pythonChapter5Questions } from "./pythonQuestions";
import { englishChapter1Questions, englishChapter2Questions, englishChapter3Questions } from "./englishQuestions";
import { aptitudeChapter1Questions, aptitudeChapter2Questions, aptitudeChapter3Questions } from "./aptitudeQuestions";
import { computerChapter1Questions, computerChapter2Questions, computerChapter3Questions } from "./computerQuestions";
import { webChapter1Questions, webChapter2Questions, webChapter3Questions } from "./webQuestions";
import { gkChapter1Questions, gkChapter2Questions } from "./gkQuestions";
import { physicsChapter1Questions, physicsChapter2Questions, physicsChapter3Questions } from "./physicsQuestions";
import { chemistryChapter1Questions, chemistryChapter2Questions, chemistryChapter3Questions } from "./chemistryQuestions";

export interface Subject {
  id: string;
  name: string;
  icon: string;
  description: string;
  chapters: Chapter[];
  color: "primary" | "xp" | "accent";
  enemyName: string;
  totalQuestions: number;
  completedQuestions: number;
}

export interface Chapter {
  id: string;
  name: string;
  questions: Question[];
  isCompleted: boolean;
  isLocked: boolean;
  enemyLevel: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  hint: string;
  xpReward: number;
  coinReward: number;
}

export interface UserProfile {
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  coins: number;
  streak: number;
  longestStreak: number;
  completedSubjects: number;
  totalStudyHours: number;
  dailyGoalMet: boolean;
  character: string;
  costume: string;
}

export const mockUser: UserProfile = {
  name: "Hero Learner",
  level: 7,
  xp: 2450,
  xpToNextLevel: 3000,
  coins: 850,
  streak: 12,
  longestStreak: 25,
  completedSubjects: 0,
  totalStudyHours: 34,
  dailyGoalMet: true,
  character: "knight",
  costume: "default",
};

export const subjects: Subject[] = [
  {
    id: "python",
    name: "Python Programming",
    icon: "🐍",
    description: "Master the art of Python sorcery — from variables to algorithms",
    color: "primary",
    enemyName: "Bug Dragon",
    totalQuestions: pythonChapter1Questions.length + pythonChapter2Questions.length + pythonChapter3Questions.length + pythonChapter4Questions.length + pythonChapter5Questions.length,
    completedQuestions: 0,
    chapters: [
      { id: "py-1", name: "Variables & Data Types", isCompleted: false, isLocked: false, enemyLevel: 1, questions: pythonChapter1Questions },
      { id: "py-2", name: "Loops & Conditions", isCompleted: false, isLocked: false, enemyLevel: 2, questions: pythonChapter2Questions },
      { id: "py-3", name: "Functions & Formulas", isCompleted: false, isLocked: false, enemyLevel: 3, questions: pythonChapter3Questions },
      { id: "py-4", name: "Lists & Dictionaries", isCompleted: false, isLocked: true, enemyLevel: 4, questions: pythonChapter4Questions },
      { id: "py-5", name: "File Handling", isCompleted: false, isLocked: true, enemyLevel: 5, questions: pythonChapter5Questions },
    ],
  },
  {
    id: "english",
    name: "Basic English",
    icon: "📖",
    description: "Conquer the realm of grammar, vocabulary, and comprehension",
    color: "xp",
    enemyName: "Grammar Golem",
    totalQuestions: englishChapter1Questions.length + englishChapter2Questions.length + englishChapter3Questions.length,
    completedQuestions: 0,
    chapters: [
      { id: "en-1", name: "Parts of Speech", isCompleted: false, isLocked: false, enemyLevel: 1, questions: englishChapter1Questions },
      { id: "en-2", name: "Tenses", isCompleted: false, isLocked: false, enemyLevel: 2, questions: englishChapter2Questions },
      { id: "en-3", name: "Vocabulary Builder", isCompleted: false, isLocked: true, enemyLevel: 3, questions: englishChapter3Questions },
    ],
  },
  {
    id: "aptitude",
    name: "Aptitude Mastery",
    icon: "🧮",
    description: "Sharpen your mind with logical reasoning and quantitative puzzles",
    color: "accent",
    enemyName: "Logic Lich",
    totalQuestions: aptitudeChapter1Questions.length + aptitudeChapter2Questions.length + aptitudeChapter3Questions.length,
    completedQuestions: 0,
    chapters: [
      { id: "apt-1", name: "Number Series", isCompleted: false, isLocked: false, enemyLevel: 1, questions: aptitudeChapter1Questions },
      { id: "apt-2", name: "Percentages & Ratios", isCompleted: false, isLocked: false, enemyLevel: 2, questions: aptitudeChapter2Questions },
      { id: "apt-3", name: "Logical Reasoning", isCompleted: false, isLocked: true, enemyLevel: 3, questions: aptitudeChapter3Questions },
    ],
  },
  {
    id: "computer",
    name: "Computer Fundamentals",
    icon: "💻",
    description: "Decode hardware, operating systems and networks to command the machine realm",
    color: "primary",
    enemyName: "Circuit Wraith",
    totalQuestions: computerChapter1Questions.length + computerChapter2Questions.length + computerChapter3Questions.length,
    completedQuestions: 0,
    chapters: [
      { id: "cf-1", name: "Computer Basics", isCompleted: false, isLocked: false, enemyLevel: 1, questions: computerChapter1Questions },
      { id: "cf-2", name: "Operating Systems", isCompleted: false, isLocked: false, enemyLevel: 2, questions: computerChapter2Questions },
      { id: "cf-3", name: "Networking", isCompleted: false, isLocked: true, enemyLevel: 3, questions: computerChapter3Questions },
    ],
  },
  {
    id: "web",
    name: "Web Development",
    icon: "🌐",
    description: "Forge websites with HTML structure, CSS styling and JavaScript magic",
    color: "accent",
    enemyName: "Layout Leviathan",
    totalQuestions: webChapter1Questions.length + webChapter2Questions.length + webChapter3Questions.length,
    completedQuestions: 0,
    chapters: [
      { id: "web-1", name: "HTML Foundations", isCompleted: false, isLocked: false, enemyLevel: 1, questions: webChapter1Questions },
      { id: "web-2", name: "CSS & Layouts", isCompleted: false, isLocked: false, enemyLevel: 2, questions: webChapter2Questions },
      { id: "web-3", name: "JavaScript Essentials", isCompleted: false, isLocked: true, enemyLevel: 3, questions: webChapter3Questions },
    ],
  },
  {
    id: "general",
    name: "General Awareness",
    icon: "🌍",
    description: "World facts, science basics and communication skills for real-world quests",
    color: "xp",
    enemyName: "Trivia Titan",
    totalQuestions: gkChapter1Questions.length + gkChapter2Questions.length,
    completedQuestions: 0,
    chapters: [
      { id: "gk-1", name: "World & Science Facts", isCompleted: false, isLocked: false, enemyLevel: 1, questions: gkChapter1Questions },
      { id: "gk-2", name: "Communication Skills", isCompleted: false, isLocked: false, enemyLevel: 2, questions: gkChapter2Questions },
    ],
  },
  {
    id: "physics",
    name: "Physics Lab",
    icon: "🧲",
    description: "Tap objects to change speed, mass and height — watch the physics update live",
    color: "primary",
    enemyName: "Gravity Golem",
    totalQuestions: physicsChapter1Questions.length + physicsChapter2Questions.length + physicsChapter3Questions.length,
    completedQuestions: 0,
    chapters: [
      { id: "phy-1", name: "Motion & Speed", isCompleted: false, isLocked: false, enemyLevel: 1, questions: physicsChapter1Questions },
      { id: "phy-2", name: "Force & Newton's Laws", isCompleted: false, isLocked: false, enemyLevel: 2, questions: physicsChapter2Questions },
      { id: "phy-3", name: "Work, Energy & Power", isCompleted: false, isLocked: true, enemyLevel: 3, questions: physicsChapter3Questions },
    ],
  },
  {
    id: "chemistry",
    name: "Chemistry Lab",
    icon: "⚗️",
    description: "Mix two chemicals and watch new compounds — and new colours — form",
    color: "accent",
    enemyName: "Toxic Alchemist",
    totalQuestions: chemistryChapter1Questions.length + chemistryChapter2Questions.length + chemistryChapter3Questions.length,
    completedQuestions: 0,
    chapters: [
      { id: "chem-1", name: "Atoms & Elements", isCompleted: false, isLocked: false, enemyLevel: 1, questions: chemistryChapter1Questions },
      { id: "chem-2", name: "Mixing & Reactions", isCompleted: false, isLocked: false, enemyLevel: 2, questions: chemistryChapter2Questions },
      { id: "chem-3", name: "Acids & Bases", isCompleted: false, isLocked: true, enemyLevel: 3, questions: chemistryChapter3Questions },
    ],
  },
];

export interface SubjectCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  subjectIds: string[];
}

export const subjectCategories: SubjectCategory[] = [
  {
    id: "all",
    name: "All Subjects",
    icon: "🗺️",
    description: "Everything you can learn",
    subjectIds: subjects.map((s) => s.id),
  },
  {
    id: "interview",
    name: "Interview Prep",
    icon: "💼",
    description: "Crack your placement rounds",
    subjectIds: ["python", "english", "aptitude"],
  },
  {
    id: "general",
    name: "General Topics",
    icon: "🌍",
    description: "Everyday knowledge & reasoning",
    subjectIds: ["general", "computer", "aptitude"],
  },
  {
    id: "coding",
    name: "Coding",
    icon: "💻",
    description: "Build with code",
    subjectIds: ["python", "web"],
  },
  {
    id: "lab",
    name: "Labs",
    icon: "🧪",
    description: "Interactive physics & chemistry",
    subjectIds: ["physics", "chemistry"],
  },
];

export type CostumeSlot = "head" | "body" | "legs" | "accessory";

export interface CostumeItem {
  id: string;
  name: string;
  price: number;
  emoji: string;
  owned: boolean;
  equipped: boolean;
  rarity: "common" | "rare" | "epic" | "legendary";
  bonus: string;
  slot: CostumeSlot;
}

export const costumes: CostumeItem[] = [
  // ── HEAD ──
  { id: "head-default", name: "Knight Helm", price: 0, emoji: "⛑️", owned: true, equipped: true, rarity: "common", bonus: "None", slot: "head" },
  { id: "head-prince", name: "Royal Prince", price: 120, emoji: "🤴🏻", owned: false, equipped: false, rarity: "common", bonus: "+3% XP", slot: "head" },
  { id: "head-santa", name: "Santa Hat", price: 200, emoji: "🎅", owned: false, equipped: false, rarity: "rare", bonus: "+8% XP", slot: "head" },
  { id: "head-bald", name: "Bald Look", price: 80, emoji: "👩‍🦲", owned: false, equipped: false, rarity: "common", bonus: "+2% Coins", slot: "head" },
  { id: "head-wizard", name: "Wizard Hat", price: 150, emoji: "🧙", owned: false, equipped: false, rarity: "common", bonus: "+3% XP", slot: "head" },
  { id: "head-crown", name: "Iron Crown", price: 200, emoji: "👑", owned: false, equipped: false, rarity: "rare", bonus: "+8% XP", slot: "head" },
  { id: "head-ninja", name: "Shadow Hood", price: 350, emoji: "🥷", owned: false, equipped: false, rarity: "rare", bonus: "+10% XP", slot: "head" },
  { id: "head-demon", name: "Demon Face", price: 600, emoji: "😈", owned: false, equipped: false, rarity: "epic", bonus: "+18% XP", slot: "head" },
  { id: "head-ogre", name: "Ogre Mask", price: 500, emoji: "👹", owned: false, equipped: false, rarity: "epic", bonus: "+15% XP", slot: "head" },
  { id: "head-goblin", name: "Goblin Face", price: 550, emoji: "👺", owned: false, equipped: false, rarity: "epic", bonus: "+16% XP", slot: "head" },
  { id: "head-dog", name: "Doggo Head", price: 300, emoji: "🐶", owned: false, equipped: false, rarity: "rare", bonus: "+7% Coins", slot: "head" },
  { id: "head-cat", name: "Cat Ears", price: 300, emoji: "🐱", owned: false, equipped: false, rarity: "rare", bonus: "+7% Coins", slot: "head" },
  { id: "head-lion", name: "Lion Mane", price: 700, emoji: "🦁", owned: false, equipped: false, rarity: "epic", bonus: "+20% XP", slot: "head" },
  { id: "head-tiger", name: "Tiger Face", price: 750, emoji: "🐯", owned: false, equipped: false, rarity: "epic", bonus: "+20% XP", slot: "head" },
  { id: "head-frog", name: "Frog Prince", price: 250, emoji: "🐸", owned: false, equipped: false, rarity: "rare", bonus: "+6% Coins", slot: "head" },
  { id: "head-cow", name: "Cow Head", price: 200, emoji: "🐮", owned: false, equipped: false, rarity: "common", bonus: "+4% Coins", slot: "head" },
  { id: "head-pig", name: "Piggy Face", price: 200, emoji: "🐷", owned: false, equipped: false, rarity: "common", bonus: "+4% Coins", slot: "head" },
  { id: "head-clown", name: "Clown Mask", price: 400, emoji: "🤡", owned: false, equipped: false, rarity: "rare", bonus: "+10% Coins", slot: "head" },
  { id: "head-skull", name: "Death Skull", price: 900, emoji: "💀", owned: false, equipped: false, rarity: "epic", bonus: "+22% XP", slot: "head" },
  { id: "head-pirate-skull", name: "Pirate Skull", price: 1000, emoji: "☠️", owned: false, equipped: false, rarity: "epic", bonus: "+25% XP", slot: "head" },
  { id: "head-halo", name: "Divine Halo", price: 1000, emoji: "😇", owned: false, equipped: false, rarity: "epic", bonus: "+22% XP", slot: "head" },
  { id: "head-alien", name: "Alien Visor", price: 1500, emoji: "👽", owned: false, equipped: false, rarity: "legendary", bonus: "+35% XP", slot: "head" },
  { id: "head-robot", name: "Robot Head", price: 1800, emoji: "🤖", owned: false, equipped: false, rarity: "legendary", bonus: "+40% XP", slot: "head" },
  { id: "head-pumpkin", name: "Jack O'Lantern", price: 2000, emoji: "🎃", owned: false, equipped: false, rarity: "legendary", bonus: "+45% XP", slot: "head" },
  { id: "head-dragon", name: "Dragon Skull", price: 2500, emoji: "🐲", owned: false, equipped: false, rarity: "legendary", bonus: "+50% XP", slot: "head" },

  // ── BODY ──
  { id: "body-default", name: "Knight Armor", price: 0, emoji: "🛡️", owned: true, equipped: true, rarity: "common", bonus: "None", slot: "body" },
  { id: "body-coat", name: "Winter Coat", price: 150, emoji: "🧥", owned: false, equipped: false, rarity: "common", bonus: "+3% XP", slot: "body" },
  { id: "body-labcoat", name: "Lab Coat", price: 200, emoji: "🥼", owned: false, equipped: false, rarity: "common", bonus: "+5% XP", slot: "body" },
  { id: "body-vest", name: "Safety Vest", price: 180, emoji: "🦺", owned: false, equipped: false, rarity: "common", bonus: "+4% Coins", slot: "body" },
  { id: "body-blouse", name: "Fancy Blouse", price: 250, emoji: "👚", owned: false, equipped: false, rarity: "rare", bonus: "+8% XP", slot: "body" },
  { id: "body-tshirt", name: "Hero T-Shirt", price: 120, emoji: "👕", owned: false, equipped: false, rarity: "common", bonus: "+3% Coins", slot: "body" },
  { id: "body-robe", name: "Wizard Robe", price: 200, emoji: "🥋", owned: false, equipped: false, rarity: "common", bonus: "+5% XP", slot: "body" },
  { id: "body-pirate", name: "Pirate Coat", price: 350, emoji: "🏴‍☠️", owned: false, equipped: false, rarity: "rare", bonus: "+10% Coins", slot: "body" },
  { id: "body-samurai", name: "Samurai Plate", price: 500, emoji: "⚔️", owned: false, equipped: false, rarity: "rare", bonus: "+12% XP", slot: "body" },
  { id: "body-phoenix", name: "Phoenix Vest", price: 750, emoji: "🦅", owned: false, equipped: false, rarity: "epic", bonus: "+20% XP", slot: "body" },
  { id: "body-mech", name: "Mech Chassis", price: 900, emoji: "🤖", owned: false, equipped: false, rarity: "epic", bonus: "+22% Coins", slot: "body" },
  { id: "body-void", name: "Void Cloak", price: 1200, emoji: "🌀", owned: false, equipped: false, rarity: "legendary", bonus: "+30% All Rewards", slot: "body" },
  { id: "body-celestial", name: "Celestial Robe", price: 2500, emoji: "🌟", owned: false, equipped: false, rarity: "legendary", bonus: "+50% All Rewards", slot: "body" },

  // ── LEGS ──
  { id: "legs-default", name: "Iron Greaves", price: 0, emoji: "🦿", owned: true, equipped: true, rarity: "common", bonus: "None", slot: "legs" },
  { id: "legs-pants", name: "Hero Pants", price: 120, emoji: "👖", owned: false, equipped: false, rarity: "common", bonus: "+3% Coins", slot: "legs" },
  { id: "legs-shorts", name: "Battle Shorts", price: 100, emoji: "🩳", owned: false, equipped: false, rarity: "common", bonus: "+2% Coins", slot: "legs" },
  { id: "legs-boots", name: "Scout Boots", price: 150, emoji: "👢", owned: false, equipped: false, rarity: "common", bonus: "+3% Coins", slot: "legs" },
  { id: "legs-sandals", name: "Monk Sandals", price: 300, emoji: "🩴", owned: false, equipped: false, rarity: "rare", bonus: "+8% XP", slot: "legs" },
  { id: "legs-frost", name: "Frost Leggings", price: 500, emoji: "❄️", owned: false, equipped: false, rarity: "rare", bonus: "+12% Coins", slot: "legs" },
  { id: "legs-flame", name: "Flame Treads", price: 700, emoji: "🔥", owned: false, equipped: false, rarity: "epic", bonus: "+18% XP", slot: "legs" },
  { id: "legs-shadow", name: "Shadow Steps", price: 950, emoji: "🌑", owned: false, equipped: false, rarity: "epic", bonus: "+20% Coins", slot: "legs" },
  { id: "legs-astral", name: "Astral Walkers", price: 1400, emoji: "✨", owned: false, equipped: false, rarity: "legendary", bonus: "+30% XP", slot: "legs" },
  { id: "legs-titan", name: "Titan Stompers", price: 2200, emoji: "⚡", owned: false, equipped: false, rarity: "legendary", bonus: "+40% All Rewards", slot: "legs" },

  // ── ACCESSORY ──
  { id: "acc-none", name: "No Accessory", price: 0, emoji: "none", owned: true, equipped: true, rarity: "common", bonus: "None", slot: "accessory" },
  { id: "acc-menorah", name: "Holy Menorah", price: 300, emoji: "🕎", owned: false, equipped: false, rarity: "rare", bonus: "+10% XP", slot: "accessory" },
  { id: "acc-clock", name: "Time Keeper", price: 150, emoji: "🕔", owned: false, equipped: false, rarity: "common", bonus: "+3% Coins", slot: "accessory" },
  { id: "acc-brightness", name: "Light Aura", price: 200, emoji: "🔅", owned: false, equipped: false, rarity: "common", bonus: "+5% XP", slot: "accessory" },
  { id: "acc-badge", name: "Honor Badge", price: 250, emoji: "🔰", owned: false, equipped: false, rarity: "rare", bonus: "+8% XP", slot: "accessory" },
  { id: "acc-fleur", name: "Fleur-de-lis", price: 400, emoji: "⚜️", owned: false, equipped: false, rarity: "rare", bonus: "+10% Coins", slot: "accessory" },
  { id: "acc-wand", name: "Magic Wand", price: 500, emoji: "🪄", owned: false, equipped: false, rarity: "epic", bonus: "+15% XP", slot: "accessory" },
  { id: "acc-windchime", name: "Wind Chime", price: 350, emoji: "🎐", owned: false, equipped: false, rarity: "rare", bonus: "+8% Coins", slot: "accessory" },
  { id: "acc-ribbon", name: "Lucky Ribbon", price: 180, emoji: "🎀", owned: false, equipped: false, rarity: "common", bonus: "+4% Coins", slot: "accessory" },
  { id: "acc-bomb", name: "Power Bomb", price: 600, emoji: "💣", owned: false, equipped: false, rarity: "epic", bonus: "+18% XP", slot: "accessory" },
  { id: "acc-swords", name: "Dual Swords", price: 700, emoji: "⚔️", owned: false, equipped: false, rarity: "epic", bonus: "+20% XP", slot: "accessory" },
  { id: "acc-shield", name: "Guardian Shield", price: 500, emoji: "🛡️", owned: false, equipped: false, rarity: "epic", bonus: "+15% Coins", slot: "accessory" },
  { id: "acc-prayer", name: "Prayer Beads", price: 300, emoji: "📿", owned: false, equipped: false, rarity: "rare", bonus: "+8% XP", slot: "accessory" },
  { id: "acc-hamsa", name: "Hamsa Hand", price: 450, emoji: "🪬", owned: false, equipped: false, rarity: "rare", bonus: "+12% All Rewards", slot: "accessory" },
  { id: "acc-evil-eye", name: "Evil Eye", price: 400, emoji: "🧿", owned: false, equipped: false, rarity: "rare", bonus: "+10% All Rewards", slot: "accessory" },
  { id: "acc-moon", name: "Dark Moon", price: 800, emoji: "🌚", owned: false, equipped: false, rarity: "epic", bonus: "+20% XP", slot: "accessory" },
  { id: "acc-sun", name: "Blazing Sun", price: 850, emoji: "🌞", owned: false, equipped: false, rarity: "epic", bonus: "+22% XP", slot: "accessory" },
  { id: "acc-dove", name: "Peace Dove", price: 600, emoji: "🕊️", owned: false, equipped: false, rarity: "epic", bonus: "+18% All Rewards", slot: "accessory" },
  { id: "acc-wings", name: "Angel Wings", price: 900, emoji: "🪽", owned: false, equipped: false, rarity: "epic", bonus: "+22% All Rewards", slot: "accessory" },
  { id: "acc-feather", name: "Phoenix Feather", price: 500, emoji: "🪶", owned: false, equipped: false, rarity: "rare", bonus: "+12% XP", slot: "accessory" },
  { id: "acc-scorpion", name: "Scorpion Claw", price: 700, emoji: "🦂", owned: false, equipped: false, rarity: "epic", bonus: "+18% XP", slot: "accessory" },
  { id: "acc-web", name: "Spider Web", price: 400, emoji: "🕸️", owned: false, equipped: false, rarity: "rare", bonus: "+10% Coins", slot: "accessory" },
  { id: "acc-spider", name: "Shadow Spider", price: 550, emoji: "🕷️", owned: false, equipped: false, rarity: "epic", bonus: "+15% XP", slot: "accessory" },
  { id: "acc-lotus", name: "Sacred Lotus", price: 1000, emoji: "🪷", owned: false, equipped: false, rarity: "legendary", bonus: "+30% All Rewards", slot: "accessory" },
  { id: "acc-lantern", name: "Spirit Lantern", price: 650, emoji: "🏮", owned: false, equipped: false, rarity: "epic", bonus: "+18% Coins", slot: "accessory" },
  { id: "acc-fan", name: "Battle Fan", price: 450, emoji: "🪭", owned: false, equipped: false, rarity: "rare", bonus: "+10% XP", slot: "accessory" },
  { id: "acc-pirate-flag", name: "Pirate Flag", price: 800, emoji: "🏴‍☠️", owned: false, equipped: false, rarity: "epic", bonus: "+20% Coins", slot: "accessory" },
  { id: "acc-israel", name: "Star of David", price: 1200, emoji: "🇮🇱", owned: false, equipped: false, rarity: "legendary", bonus: "+35% All Rewards", slot: "accessory" },
  { id: "acc-india", name: "Tricolor Pride", price: 1200, emoji: "🇮🇳", owned: false, equipped: false, rarity: "legendary", bonus: "+35% All Rewards", slot: "accessory" },
  { id: "acc-orb", name: "Crystal Orb", price: 400, emoji: "🔮", owned: false, equipped: false, rarity: "rare", bonus: "+10% XP", slot: "accessory" },
  { id: "acc-aura", name: "Golden Aura", price: 1600, emoji: "💫", owned: false, equipped: false, rarity: "legendary", bonus: "+40% All Rewards", slot: "accessory" },
];
