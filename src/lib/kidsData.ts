export interface KidsQuestion {
  id: string;
  prompt: string;
  visual?: string;
  options: string[];
  correctAnswer: number;
}

import type { AnimalId } from "@/lib/animalGuides";
import { animalGuides } from "@/lib/animalGuides";

export interface KidsTopic {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  tone: "sky" | "peach" | "mint" | "lilac" | "sun";
  /** animal guide that hosts this subject */
  guide: AnimalId;
  questions: KidsQuestion[];
}

export const kidsTopics: KidsTopic[] = [
  {
    id: "abc",
    name: "English & Phonics",
    emoji: "🔤",
    tagline: "Letters, sounds and words",
    tone: "sun",
    guide: "parrot",
    questions: [
      { id: "abc-1", prompt: "Which letter does this start with?", visual: "🍎", options: ["A", "B", "C", "D"], correctAnswer: 0 },
      { id: "abc-2", prompt: "Which letter does this start with?", visual: "🐝", options: ["D", "B", "P", "M"], correctAnswer: 1 },
      { id: "abc-3", prompt: "Which letter does this start with?", visual: "🐈", options: ["S", "K", "C", "T"], correctAnswer: 2 },
      { id: "abc-4", prompt: "Which letter comes after E?", options: ["D", "G", "F", "H"], correctAnswer: 2 },
      { id: "abc-5", prompt: "Which one is a vowel?", options: ["M", "U", "T", "R"], correctAnswer: 1 },
      { id: "abc-6", prompt: "Which letter does this start with?", visual: "🐶", options: ["D", "B", "G", "O"], correctAnswer: 0 },
      { id: "abc-7", prompt: "Finish the word: _ISH", visual: "🐟", options: ["D", "F", "W", "N"], correctAnswer: 1 },
      { id: "abc-8", prompt: "Which letter does this start with?", visual: "🌞", options: ["C", "Z", "S", "X"], correctAnswer: 2 },
    ],
  },
  {
    id: "shapes",
    name: "Shapes & Colors",
    emoji: "🔺",
    tagline: "Spot shapes and colors",
    tone: "lilac",
    guide: "panda",
    questions: [
      { id: "sh-1", prompt: "What shape is this?", visual: "🔺", options: ["Circle", "Square", "Triangle", "Star"], correctAnswer: 2 },
      { id: "sh-2", prompt: "What shape is this?", visual: "🔵", options: ["Circle", "Heart", "Square", "Oval"], correctAnswer: 0 },
      { id: "sh-3", prompt: "What color is this?", visual: "🟩", options: ["Blue", "Green", "Yellow", "Red"], correctAnswer: 1 },
      { id: "sh-4", prompt: "What color is this?", visual: "🟨", options: ["Yellow", "Orange", "White", "Pink"], correctAnswer: 0 },
      { id: "sh-5", prompt: "How many sides does a square have?", visual: "🟦", options: ["3", "5", "4", "6"], correctAnswer: 2 },
      { id: "sh-6", prompt: "What shape is this?", visual: "⭐", options: ["Star", "Moon", "Sun", "Heart"], correctAnswer: 0 },
      { id: "sh-7", prompt: "Which one is red?", options: ["🟢", "🟣", "🔴", "🟤"], correctAnswer: 2 },
      { id: "sh-8", prompt: "What shape is a ball?", visual: "⚽", options: ["Square", "Round", "Triangle", "Flat"], correctAnswer: 1 },
    ],
  },
  {
    id: "math",
    name: "Fun Math",
    emoji: "➕",
    tagline: "Counting, sums and patterns",
    tone: "mint",
    guide: "tortoise",
    questions: [
      { id: "ma-0", prompt: "How many apples?", visual: "🍎🍎🍎", options: ["2", "3", "4", "5"], correctAnswer: 1 },
      { id: "ma-9", prompt: "What comes after 7?", options: ["8", "6", "9", "10"], correctAnswer: 0 },
      { id: "ma-1", prompt: "4 + 4 = ?", options: ["8", "6", "9", "7"], correctAnswer: 0 },
      { id: "ma-2", prompt: "What comes next? 2, 4, 6, __", options: ["8", "7", "9", "10"], correctAnswer: 0 },
      { id: "ma-3", prompt: "3 × 2 = ?", options: ["6", "5", "8", "9"], correctAnswer: 0 },
      { id: "ma-4", prompt: "Half of 10 is?", options: ["5", "2", "4", "6"], correctAnswer: 0 },
      { id: "ma-5", prompt: "Which is an even number?", options: ["12", "3", "7", "9"], correctAnswer: 0 },
      { id: "ma-6", prompt: "9 - 5 = ?", options: ["4", "3", "5", "2"], correctAnswer: 0 },
      { id: "ma-7", prompt: "What comes next? 5, 10, 15, __", options: ["20", "16", "25", "18"], correctAnswer: 0 },
      { id: "ma-8", prompt: "1 + 2 + 3 = ?", options: ["6", "5", "7", "8"], correctAnswer: 0 },
    ],
  },
  {
    id: "science",
    name: "Little Science",
    emoji: "🔬",
    tagline: "Animals, nature and space",
    tone: "sky",
    guide: "owl",
    questions: [
      { id: "sc-1", prompt: "Which animal says moo?", options: ["🐄", "🐕", "🐔", "🐸"], correctAnswer: 0 },
      { id: "sc-2", prompt: "What do plants need to grow?", options: ["Sunlight", "Candy", "Toys", "Paper"], correctAnswer: 0 },
      { id: "sc-3", prompt: "Which one lives in water?", options: ["🐟", "🐘", "🦁", "🐒"], correctAnswer: 0 },
      { id: "sc-4", prompt: "What do we breathe?", options: ["Air", "Water", "Sand", "Milk"], correctAnswer: 0 },
      { id: "sc-5", prompt: "Which one gives us light in the day?", options: ["🌞", "🌙", "⭐", "☁️"], correctAnswer: 0 },
      { id: "sc-6", prompt: "How many legs does a spider have?", visual: "🕷️", options: ["8", "6", "4", "10"], correctAnswer: 0 },
      { id: "sc-7", prompt: "Ice is water that is very...", options: ["Cold", "Hot", "Loud", "Soft"], correctAnswer: 0 },
      { id: "sc-8", prompt: "Which planet do we live on?", options: ["Earth", "Mars", "Moon", "Sun"], correctAnswer: 0 },
    ],
  },
  {
    id: "stories",
    name: "Rhymes & Stories",
    emoji: "📚",
    tagline: "Listen, imagine and tell",
    tone: "peach",
    guide: "monkey",
    questions: [
      { id: "st-1", prompt: "Twinkle twinkle little ___", visual: "⭐", options: ["Star", "Car", "Jar", "Bear"], correctAnswer: 0 },
      { id: "st-2", prompt: "Who climbed up the water spout?", visual: "🕷️", options: ["Spider", "Cat", "Cow", "Duck"], correctAnswer: 0 },
      { id: "st-3", prompt: "The tortoise won the race because he was...", visual: "🐢", options: ["Steady", "Fast", "Loud", "Sleepy"], correctAnswer: 0 },
      { id: "st-4", prompt: "Baa baa black ___, have you any wool?", visual: "🐑", options: ["Sheep", "Sheet", "Ship", "Shop"], correctAnswer: 0 },
      { id: "st-5", prompt: "A story about animals that teaches a lesson is a...", visual: "🦊", options: ["Fable", "Song", "Menu", "Map"], correctAnswer: 0 },
      { id: "st-6", prompt: "Humpty Dumpty sat on a ___", visual: "🥚", options: ["Wall", "Ball", "Bed", "Boat"], correctAnswer: 0 },
      { id: "st-7", prompt: "Who blew the little pigs' house down?", visual: "🐺", options: ["Wolf", "Bear", "Lion", "Bird"], correctAnswer: 0 },
      { id: "st-8", prompt: "Words that sound the same at the end are called...", visual: "🎵", options: ["Rhymes", "Rules", "Roads", "Ropes"], correctAnswer: 0 },
    ],
  },
  {
    id: "habits",
    name: "Good Habits & Safety",
    emoji: "🧼",
    tagline: "Healthy, kind and safe",
    tone: "mint",
    guide: "elephant",
    questions: [
      { id: "hb-1", prompt: "What do we do before eating?", visual: "🧼", options: ["Wash hands", "Jump", "Shout", "Sleep"], correctAnswer: 0 },
      { id: "hb-2", prompt: "How many times a day should we brush?", visual: "🪥", options: ["2", "0", "5", "1"], correctAnswer: 0 },
      { id: "hb-3", prompt: "Which light means STOP?", visual: "🚦", options: ["Red", "Green", "Blue", "Yellow"], correctAnswer: 0 },
      { id: "hb-4", prompt: "Which is a healthy snack?", options: ["🍎", "🍬", "🍟", "🍰"], correctAnswer: 0 },
      { id: "hb-5", prompt: "What do we say when someone helps us?", options: ["Thank you", "Go away", "Nothing", "Hurry"], correctAnswer: 0 },
      { id: "hb-6", prompt: "Where do we throw trash?", visual: "🗑️", options: ["Dustbin", "Road", "Park", "River"], correctAnswer: 0 },
      { id: "hb-7", prompt: "Crossing the road, we hold a...", visual: "🚸", options: ["Grown-up's hand", "Toy", "Ball", "Bag"], correctAnswer: 0 },
      { id: "hb-8", prompt: "How many hours should kids sleep?", visual: "😴", options: ["About 10", "About 2", "About 4", "None"], correctAnswer: 0 },
    ],
  },
];

export const getKidsTopic = (id?: string) => kidsTopics.find((t) => t.id === id);

/** animal face shown on the subject card */
export const getTopicFace = (topic: KidsTopic) => animalGuides[topic.guide].emoji;

/* ---------------- age & difficulty ---------------- */

const AGE_KEY = "kids-age";
export const MIN_AGE = 3;
export const MAX_AGE = 10;

export const getKidsAge = (): number => {
  const raw = Number(localStorage.getItem(AGE_KEY));
  return Number.isFinite(raw) && raw >= MIN_AGE && raw <= MAX_AGE ? raw : 5;
};

export const saveKidsAge = (age: number) =>
  localStorage.setItem(AGE_KEY, String(Math.min(MAX_AGE, Math.max(MIN_AGE, age))));

export interface Difficulty {
  label: string;
  emoji: string;
  /** number of answer choices shown */
  choices: number;
  /** number of questions in a round */
  questions: number;
}

export const getDifficulty = (age: number): Difficulty => {
  if (age <= 4) return { label: "Tiny Steps", emoji: "🍼", choices: 2, questions: 4 };
  if (age <= 6) return { label: "Easy", emoji: "🌱", choices: 3, questions: 6 };
  if (age <= 8) return { label: "Medium", emoji: "🌿", choices: 4, questions: 8 };
  return { label: "Challenge", emoji: "🔥", choices: 4, questions: 10 };
};

/** deterministic shuffle so a question always looks the same in one round */
const shuffle = <T,>(arr: T[], seed: number): T[] => {
  const a = [...arr];
  let s = seed + 1;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** trims options + question count to match the child's age */
export const getQuestionsForAge = (topic: KidsTopic, age: number): KidsQuestion[] => {
  const { choices, questions } = getDifficulty(age);
  return topic.questions.slice(0, questions).map((q, qi) => {
    const correct = q.options[q.correctAnswer];
    const wrong = q.options.filter((_, i) => i !== q.correctAnswer).slice(0, Math.max(1, choices - 1));
    const opts = shuffle([correct, ...wrong], qi + age);
    return { ...q, options: opts, correctAnswer: opts.indexOf(correct) };
  });
};

const STORAGE_KEY = "kids-stars";

export const getKidsStars = (): Record<string, number> => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
};

export const saveKidsStars = (topicId: string, stars: number) => {
  const all = getKidsStars();
  all[topicId] = Math.max(all[topicId] ?? 0, stars);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
};
