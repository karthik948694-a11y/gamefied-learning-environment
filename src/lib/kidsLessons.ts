export interface LessonCard {
  /** big picture (emoji art) */
  visual: string;
  /** the thing being taught, e.g. "A" or "3" */
  title: string;
  /** short kid-friendly caption */
  caption: string;
  /** optional extra row of small pictures */
  strip?: string[];
}

export const kidsLessons: Record<string, LessonCard[]> = {
  abc: [
    { visual: "🍎", title: "A a", caption: "A is for Apple. A… A… Apple!", strip: ["🍎", "🐜", "✈️"] },
    { visual: "🐝", title: "B b", caption: "B is for Bee. Buzz buzz!", strip: ["🐝", "🎈", "🍌"] },
    { visual: "🐈", title: "C c", caption: "C is for Cat. Meow!", strip: ["🐈", "🚗", "🎂"] },
    { visual: "🐶", title: "D d", caption: "D is for Dog. Woof woof!", strip: ["🐶", "🦆", "🥁"] },
    { visual: "🐟", title: "F f", caption: "F is for Fish. It swims!", strip: ["🐟", "🌸", "🦶"] },
    { visual: "🌞", title: "S s", caption: "S is for Sun. So bright!", strip: ["🌞", "⭐", "🐍"] },
    { visual: "🅰️🅴🅸🅾️🆄", title: "Vowels", caption: "A, E, I, O, U are the vowels. Sing them!", strip: ["🎵", "🗣️", "🎶"] },
  ],
  shapes: [
    { visual: "🔺", title: "Triangle", caption: "A triangle has 3 sides.", strip: ["🍕", "⛺", "📐"] },
    { visual: "🔵", title: "Circle", caption: "A circle is round like a ball.", strip: ["⚽", "🍩", "🌕"] },
    { visual: "🟦", title: "Square", caption: "A square has 4 equal sides.", strip: ["🧊", "🎁", "🪟"] },
    { visual: "⭐", title: "Star", caption: "A star has 5 pointy tips." },
    { visual: "🔴", title: "Red", caption: "Red like a strawberry.", strip: ["🍓", "🚒", "🌹"] },
    { visual: "🟩", title: "Green", caption: "Green like grass and leaves.", strip: ["🥦", "🌳", "🐢"] },
    { visual: "🟨", title: "Yellow", caption: "Yellow like the sun and bananas.", strip: ["🍌", "🌞", "🐥"] },
  ],
  math: [
    { visual: "\ud83c\udf4e\ud83c\udf4e\ud83c\udf4e", title: "1 2 3", caption: "Count with me: one, two, three apples!", strip: ["1\ufe0f\u20e3", "2\ufe0f\u20e3", "3\ufe0f\u20e3"] },
    { visual: "\ud83c\udf88\ud83c\udf88\ud83c\udf88\ud83c\udf88\ud83c\udf88", title: "4 and 5", caption: "Four, five balloons. High five!", strip: ["4\ufe0f\u20e3", "5\ufe0f\u20e3", "\ud83d\udd90\ufe0f"] },
    { visual: "✌️ ➕ ✌️ = 🖐️➕☝️", title: "2 + 2 = 4", caption: "Two fingers and two fingers make four." },
    { visual: "2️⃣ 4️⃣ 6️⃣ 8️⃣", title: "Patterns", caption: "Skip counting by 2: 2, 4, 6, 8!" },
    { visual: "5️⃣ 🔟 1️⃣5️⃣ 2️⃣0️⃣", title: "Count by 5", caption: "5, 10, 15, 20 — like counting hands." },
    { visual: "🍰🍰🍰 ✖️2️⃣", title: "Times", caption: "3 cakes two times makes 6 cakes." },
    { visual: "🍫 ➗ 2️⃣", title: "Halves", caption: "Share the chocolate: half for you, half for me." },
    { visual: "2️⃣ 4️⃣ 6️⃣", title: "Even & Odd", caption: "Even numbers pair up. Odd ones have one left over." },
  ],
  science: [
    { visual: "🌱🌞💧", title: "Plants grow", caption: "Plants need sunlight, water and air." },
    { visual: "🐄", title: "Animal sounds", caption: "The cow says moo. The dog says woof!", strip: ["🐕", "🐔", "🐸"] },
    { visual: "🐟🌊", title: "Water homes", caption: "Fish live in water. They breathe with gills." },
    { visual: "🕷️", title: "Eight legs", caption: "A spider has 8 legs. Count them!" },
    { visual: "💧➡️🧊", title: "Cold water", caption: "When water gets very cold it becomes ice." },
    { visual: "🌍", title: "Our planet", caption: "We live on Earth — the blue planet." },
  ],
  stories: [
    { visual: "\u2b50", title: "Twinkle Twinkle", caption: "Twinkle twinkle little star — star and are rhyme!", strip: ["\u2b50", "\ud83c\udf19", "\u2728"] },
    { visual: "\ud83d\udd77\ufe0f", title: "Itsy Bitsy Spider", caption: "The spider climbed the spout, then tried again!", strip: ["\ud83d\udd77\ufe0f", "\ud83c\udf27\ufe0f", "\ud83c\udf1e"] },
    { visual: "\ud83d\udc22\ud83c\udfc1\ud83d\udc07", title: "Tortoise & Hare", caption: "Slow and steady wins the race.", strip: ["\ud83d\udc22", "\ud83d\udc07", "\ud83c\udfc6"] },
    { visual: "\ud83d\udc3a\ud83c\udfe0", title: "Three Little Pigs", caption: "A strong brick house kept the pigs safe.", strip: ["\ud83d\udc37", "\ud83e\uddf1", "\ud83c\udfe0"] },
    { visual: "\ud83c\udfb5", title: "Rhyming words", caption: "Cat and hat rhyme. Sun and fun rhyme!", strip: ["\ud83d\udc08", "\ud83c\udfa9", "\ud83c\udf1e"] },
    { visual: "\ud83d\udcda", title: "Every story has", caption: "A beginning, a middle and an ending.", strip: ["1\ufe0f\u20e3", "2\ufe0f\u20e3", "3\ufe0f\u20e3"] },
  ],
  habits: [
    { visual: "\ud83e\uddfc", title: "Wash hands", caption: "Wash with soap before eating and after play.", strip: ["\ud83d\udca7", "\ud83e\uddfc", "\ud83d\ude4c"] },
    { visual: "\ud83e\udea5", title: "Brush teeth", caption: "Brush twice a day — morning and night.", strip: ["\ud83c\udf1e", "\ud83e\udea5", "\ud83c\udf19"] },
    { visual: "\ud83c\udf4e\ud83e\udd66\ud83e\udd5b", title: "Healthy food", caption: "Fruits, veggies and milk make us strong.", strip: ["\ud83c\udf4c", "\ud83e\udd55", "\ud83e\uddc0"] },
    { visual: "\ud83d\udea6", title: "Road safety", caption: "Red means stop, green means go. Hold a hand!", strip: ["\ud83d\udd34", "\ud83d\udfe1", "\ud83d\udfe2"] },
    { visual: "\ud83d\uddd1\ufe0f", title: "Keep it clean", caption: "Trash goes in the dustbin, never on the road.", strip: ["\ud83e\uddf9", "\ud83d\uddd1\ufe0f", "\ud83c\udf0d"] },
    { visual: "\ud83d\ude34", title: "Good sleep", caption: "Kids need about 10 hours of sleep to grow.", strip: ["\ud83d\udecf\ufe0f", "\ud83c\udf19", "\u23f0"] },
    { visual: "\ud83d\ude4f", title: "Be kind", caption: "Say please, thank you and sorry.", strip: ["\ud83d\ude0a", "\u2764\ufe0f", "\ud83e\udd1d"] },
  ],
};

export const getKidsLesson = (topicId?: string): LessonCard[] =>
  (topicId && kidsLessons[topicId]) || [];
