export type AnimalId = "lion" | "owl" | "elephant" | "panda" | "tortoise" | "monkey" | "rabbit" | "parrot";

export type GuideMood = "greet" | "hint" | "correct" | "wrong" | "celebrate";

export interface AnimalGuide {
  id: AnimalId;
  name: string;
  emoji: string;
  title: string;
  personality: string;
  /** kid tile tone class suffix used for colour styling */
  tone: "sun" | "lilac" | "sky" | "mint" | "peach";
  messages: Record<GuideMood, string[]>;
}

export const animalGuides: Record<AnimalId, AnimalGuide> = {
  lion: {
    id: "lion",
    name: "Leo",
    emoji: "🦁",
    title: "The Brave Guide",
    personality: "Bold, warm and always cheering you on.",
    tone: "sun",
    messages: {
      greet: [
        "Roar! I'm Leo. Ready for a brave adventure?",
        "Hello, little hero! Let's learn something amazing today.",
        "Every big lion started as a small cub. Let's go!",
      ],
      hint: [
        "Take a deep breath and look again — you've got this!",
        "Brave learners try, even when it's tricky.",
        "Read it once more, slow and steady.",
      ],
      correct: [
        "ROAR! That's exactly right!",
        "Mighty work! You're getting stronger.",
        "That's the courage of a true hero!",
      ],
      wrong: [
        "No worries — brave hearts keep trying!",
        "Almost! Let's pounce on the next one.",
        "Mistakes make us stronger. Onward!",
      ],
      celebrate: [
        "You did it! I'm so proud of you!",
        "What a champion! Let's celebrate!",
        "Roaring success — high five!",
      ],
    },
  },
  owl: {
    id: "owl",
    name: "Ollie",
    emoji: "🦉",
    title: "The Wise Helper",
    personality: "Calm, clever and full of gentle tips.",
    tone: "lilac",
    messages: {
      greet: [
        "Hoot hoot! Wise minds are curious minds.",
        "Let's think together, one step at a time.",
        "A good question is the start of learning.",
      ],
      hint: [
        "Look for the little clue hiding in the question.",
        "Try saying it out loud — it often helps.",
        "Compare each choice carefully before you pick.",
      ],
      correct: ["Very wise choice!", "Clever thinking!", "Your brain is glowing today!"],
      wrong: [
        "Good try — now we know one more thing.",
        "Thinking again is what smart learners do.",
        "Let's look at it from a new angle.",
      ],
      celebrate: ["Wonderfully wise work!", "You learned so much today!", "Hoot hoot — brilliant!"],
    },
  },
  elephant: {
    id: "elephant",
    name: "Ellie",
    emoji: "🐘",
    title: "The Memory Keeper",
    personality: "Kind and never forgets what you learned.",
    tone: "sky",
    messages: {
      greet: [
        "Hi friend! I remember how well you did last time.",
        "Let's remember together — memories are magic.",
        "Big steps start with tiny ones. Ready?",
      ],
      hint: [
        "Think back — you've seen something like this before.",
        "Remember the pattern we practiced?",
        "Slow and gentle wins the day.",
      ],
      correct: ["You remembered! Wonderful!", "Your memory is amazing!", "Just right, my friend!"],
      wrong: ["That's okay — I'll help you remember.", "Let's practice it once more.", "Nearly there!"],
      celebrate: ["I'll never forget how well you did!", "Big trunk hug for you!", "Marvellous memory!"],
    },
  },
  panda: {
    id: "panda",
    name: "Poppy",
    emoji: "🐼",
    title: "The Playful Friend",
    personality: "Silly, snuggly and loves to make learning fun.",
    tone: "mint",
    messages: {
      greet: [
        "Yay! Learning time is playing time!",
        "Let's have fun — snacks after, promise!",
        "Hi buddy! Ready to giggle and learn?",
      ],
      hint: ["Wiggle your fingers and try again!", "Guess with a smile!", "Pick the one that feels happy!"],
      correct: ["Woohoo! Bamboo-tastic!", "Yay yay yay! Correct!", "You're so fun to learn with!"],
      wrong: ["Oopsie! Let's bounce to the next one.", "Silly me, let's try again!", "No frowns — only fun!"],
      celebrate: ["Party time! You finished!", "Happy dance for you!", "So much fun with you today!"],
    },
  },
  tortoise: {
    id: "tortoise",
    name: "Tilly",
    emoji: "🐢",
    title: "The Patient Coach",
    personality: "Gentle and steady — no rushing here.",
    tone: "peach",
    messages: {
      greet: [
        "Hello! Slow and steady wins the race.",
        "No rushing today — take your time.",
        "One little step at a time, friend.",
      ],
      hint: ["Take your time, there's no hurry.", "Breathe in, breathe out, then choose.", "Steady now — you're close."],
      correct: ["Steady and correct!", "See? Patience works!", "Beautifully done."],
      wrong: ["It's fine to go slow. Try again.", "Small steps still move forward.", "Keep going, gently."],
      celebrate: ["You finished the whole journey!", "Steady effort, big reward!", "Well done, patient friend!"],
    },
  },
  monkey: {
    id: "monkey",
    name: "Momo",
    emoji: "🐵",
    title: "The Story Teller",
    personality: "Curious, cheeky and full of imagination.",
    tone: "peach",
    messages: {
      greet: [
        "Ooh ooh! Ready for a story swing?",
        "Hi friend! Let's imagine something wonderful.",
        "Stories are trees — let's climb one!",
      ],
      hint: [
        "Picture the story in your head first.",
        "Which word sounds the same at the end?",
        "Say the rhyme out loud — it helps!",
      ],
      correct: ["Ooh ooh ah ah! Perfect!", "What a story star!", "Banana-brilliant!"],
      wrong: ["Oops — let's swing back and try again.", "Nearly! Read it once more.", "Good try, little storyteller!"],
      celebrate: ["The best story today was yours!", "Ooh ooh! Standing ovation!", "You told it beautifully!"],
    },
  },
  rabbit: {
    id: "rabbit",
    name: "Ruby",
    emoji: "🐰",
    title: "The Healthy Helper",
    personality: "Bouncy, caring and loves good habits.",
    tone: "mint",
    messages: {
      greet: [
        "Hop hop! Let's learn to stay happy and safe.",
        "Hi! Good habits make strong bunnies.",
        "Ready to be healthy and kind today?",
      ],
      hint: [
        "Think about what keeps you safe.",
        "Which one would a grown-up choose?",
        "Kind and clean is always the answer.",
      ],
      correct: ["Hop-tastic! That's right!", "Healthy choice!", "You take good care of yourself!"],
      wrong: ["That's okay — let's hop back and think.", "Almost! Try the safer one.", "Good try, little bunny!"],
      celebrate: ["Super healthy hero!", "Hop hop hooray!", "You're kind, clean and safe!"],
    },
  },
  parrot: {
    id: "parrot",
    name: "Pixie",
    emoji: "\ud83e\udd9c",
    title: "The Word Singer",
    personality: "Chatty, colourful and loves repeating new words.",
    tone: "sky",
    messages: {
      greet: [
        "Squawk! Say it with me: hel-lo!",
        "Hi friend! Let's sing some words today.",
        "Pretty parrot loves new words. Ready?",
      ],
      hint: [
        "Say the sound out loud, like I do!",
        "Listen to the first sound of the word.",
        "Repeat after me, slowly.",
      ],
      correct: ["Squawk! Perfect word!", "You said it beautifully!", "Pretty, pretty correct!"],
      wrong: ["Try saying it once more with me.", "Almost! Listen again.", "Good try, little talker!"],
      celebrate: ["Squawk squawk! Word champion!", "You spoke like a star!", "Beautiful words today!"],
    },
  },
};

export const animalGuideList = Object.values(animalGuides);

/** The Lion is the primary guide throughout the app. */
export const mainGuide = animalGuides.lion;

export const getGuideMessage = (id: AnimalId, mood: GuideMood, seed = 0) => {
  const list = animalGuides[id].messages[mood];
  return list[Math.abs(seed) % list.length];
};

export const getRandomGuideMessage = (id: AnimalId, mood: GuideMood) =>
  getGuideMessage(id, mood, Math.floor(Math.random() * 1000));
