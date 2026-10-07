import type { Question } from "./gameData";

export const webChapter1Questions: Question[] = [
  { id: "web-1-1", text: "What does HTML stand for?", options: ["HyperText Markup Language", "High Text Machine Language", "Hyper Transfer Markup Link", "Home Tool Markup Language"], correctAnswer: 0, hint: "It marks up documents", xpReward: 20, coinReward: 5 },
  { id: "web-1-2", text: "Which tag creates the largest heading?", options: ["<h6>", "<head>", "<h1>", "<big>"], correctAnswer: 2, hint: "Lower number = bigger", xpReward: 20, coinReward: 5 },
  { id: "web-1-3", text: "Which attribute gives alternative text for images?", options: ["title", "alt", "src", "aria"], correctAnswer: 1, hint: "Important for accessibility", xpReward: 25, coinReward: 10 },
  { id: "web-1-4", text: "Which tag makes a hyperlink?", options: ["<link>", "<a>", "<href>", "<nav>"], correctAnswer: 1, hint: "Anchor", xpReward: 20, coinReward: 5 },
  { id: "web-1-5", text: "Semantic tag for the main navigation?", options: ["<div>", "<menu>", "<nav>", "<section>"], correctAnswer: 2, hint: "Short for navigation", xpReward: 25, coinReward: 10 },
  { id: "web-1-6", text: "Which tag is self-closing?", options: ["<p>", "<img>", "<div>", "<span>"], correctAnswer: 1, hint: "It has no inner content", xpReward: 25, coinReward: 10 },
  { id: "web-1-7", text: "Which element holds page metadata?", options: ["<body>", "<meta>", "<footer>", "<main>"], correctAnswer: 1, hint: "Lives inside <head>", xpReward: 25, coinReward: 10 },
  { id: "web-1-8", text: "🗝️ TREASURE HUNT: Which input type shows a date picker?", options: ["text", "calendar", "date", "time"], correctAnswer: 2, hint: "Literally the name", xpReward: 40, coinReward: 20 },
];

export const webChapter2Questions: Question[] = [
  { id: "web-2-1", text: "CSS stands for?", options: ["Cascading Style Sheets", "Computer Styled Sections", "Creative Style System", "Cascade Syntax Sheet"], correctAnswer: 0, hint: "Cascading…", xpReward: 20, coinReward: 5 },
  { id: "web-2-2", text: "Which selector targets a class?", options: ["#name", ".name", "name", "*name"], correctAnswer: 1, hint: "A dot", xpReward: 20, coinReward: 5 },
  { id: "web-2-3", text: "Which property changes text colour?", options: ["background", "color", "font", "fill"], correctAnswer: 1, hint: "One simple word", xpReward: 20, coinReward: 5 },
  { id: "web-2-4", text: "Which display makes a flexible row layout?", options: ["block", "inline", "flex", "table"], correctAnswer: 2, hint: "Flexbox", xpReward: 25, coinReward: 10 },
  { id: "web-2-5", text: "Which unit is relative to the root font size?", options: ["px", "em", "rem", "pt"], correctAnswer: 2, hint: "r = root", xpReward: 30, coinReward: 10 },
  { id: "web-2-6", text: "Which has the highest CSS specificity?", options: ["element", "class", "id", "universal"], correctAnswer: 2, hint: "Written with #", xpReward: 30, coinReward: 15 },
  { id: "web-2-7", text: "Which rule applies styles by screen size?", options: ["@import", "@media", "@font-face", "@keyframes"], correctAnswer: 1, hint: "Responsive design", xpReward: 30, coinReward: 10 },
  { id: "web-2-8", text: "🗝️ TREASURE HUNT: In the box model, which is outside the border?", options: ["padding", "content", "margin", "outline-offset"], correctAnswer: 2, hint: "Space between elements", xpReward: 40, coinReward: 20 },
];

export const webChapter3Questions: Question[] = [
  { id: "web-3-1", text: "Which keyword declares a block-scoped variable?", options: ["var", "let", "def", "static"], correctAnswer: 1, hint: "Not var", xpReward: 25, coinReward: 5 },
  { id: "web-3-2", text: "What does === check?", options: ["Value only", "Type only", "Value and type", "Reference only"], correctAnswer: 2, hint: "Strict equality", xpReward: 25, coinReward: 10 },
  { id: "web-3-3", text: "Which method adds an item to the end of an array?", options: ["push()", "pop()", "shift()", "slice()"], correctAnswer: 0, hint: "Opposite of pop", xpReward: 25, coinReward: 10 },
  { id: "web-3-4", text: "typeof null returns…", options: ["\"null\"", "\"object\"", "\"undefined\"", "\"number\""], correctAnswer: 1, hint: "A famous JS quirk", xpReward: 35, coinReward: 15 },
  { id: "web-3-5", text: "Which handles async results?", options: ["Promise", "Array", "Symbol", "Map"], correctAnswer: 0, hint: "Used with await", xpReward: 30, coinReward: 10 },
  { id: "web-3-6", text: "Which method selects one element by CSS selector?", options: ["getElementsByTagName", "querySelector", "createElement", "appendChild"], correctAnswer: 1, hint: "query…", xpReward: 30, coinReward: 10 },
  { id: "web-3-7", text: "What does JSON.parse do?", options: ["Object → string", "String → object", "Array → string", "Number → string"], correctAnswer: 1, hint: "Opposite of stringify", xpReward: 30, coinReward: 10 },
  { id: "web-3-8", text: "🗝️ TREASURE HUNT: Result of [1,2,3].map(n => n * 2)?", options: ["[1,2,3]", "[2,4,6]", "6", "[1,4,9]"], correctAnswer: 1, hint: "Each item doubled", xpReward: 40, coinReward: 20 },
];
