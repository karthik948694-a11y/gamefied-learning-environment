export interface TheoryPoint {
  title: string;
  content: string;
  code?: string; // optional code snippet
}

export interface ChapterTheory {
  chapterId: string;
  summary: string;
  points: TheoryPoint[];
  tip: string;
}

export const theoryData: Record<string, ChapterTheory> = {

  // ─── PYTHON ────────────────────────────────────────────
  "py-1": {
    chapterId: "py-1",
    summary: "Python is a dynamically typed language — variables are created by simple assignment with no keyword needed.",
    points: [
      {
        title: "Data Types",
        content: "Core types: int (whole numbers), float (decimals), str (text), bool (True/False), None (absence of value).",
        code: `x = 42          # int\ny = 3.14        # float\nname = "Hero"   # str\nflag = True     # bool\nempty = None    # NoneType`,
      },
      {
        title: "Variables & Naming",
        content: "Names must start with a letter or underscore. Avoid keywords like class, for, if.",
        code: `_count = 0\nhero_name = "Alex"\nlevel2 = 7`,
      },
      {
        title: "Operators",
        content: "Arithmetic: +, -, *, /, // (floor div), % (modulo), ** (power). Comparison: ==, !=, <, >, <=, >=.",
        code: `10 // 3   # → 3\n10 % 3    # → 1\n2 ** 8    # → 256`,
      },
      {
        title: "String Operations",
        content: "Strings support concatenation (+), indexing [i], slicing [a:b], and methods like .upper(), .lower(), .strip().",
        code: `s = "hello"\nprint(s[0])       # h\nprint(s.upper())  # HELLO\nprint(f"Hi {s}")  # Hi hello`,
      },
    ],
    tip: "💡 Use f-strings (f'value={x}') for clean string formatting — they evaluate expressions inside {}.",
  },

  "py-2": {
    chapterId: "py-2",
    summary: "Control flow in Python — loops let you repeat code; conditionals let you branch logic.",
    points: [
      {
        title: "if / elif / else",
        content: "Indentation defines code blocks. Python uses elif (not else if).",
        code: `score = 85\nif score >= 90:\n    print("A")\nelif score >= 70:\n    print("B")\nelse:\n    print("C")`,
      },
      {
        title: "for loop",
        content: "Iterates over any sequence. range(start, stop, step) generates numbers.",
        code: `for i in range(5):\n    print(i)      # 0 1 2 3 4\n\nfor ch in "abc":\n    print(ch)     # a b c`,
      },
      {
        title: "while loop",
        content: "Runs while the condition is True. Use break to exit early, continue to skip an iteration.",
        code: `n = 0\nwhile n < 3:\n    print(n)\n    n += 1`,
      },
      {
        title: "break & continue",
        content: "break exits the loop entirely. continue skips to the next iteration.",
        code: `for i in range(10):\n    if i == 5:\n        break       # stops at 5\n    if i % 2 == 0:\n        continue    # skips evens\n    print(i)        # prints 1 3`,
      },
    ],
    tip: "💡 Avoid infinite while loops — always ensure the condition will eventually become False.",
  },

  "py-3": {
    chapterId: "py-3",
    summary: "Functions let you group reusable code. Python supports first-class functions — they can be passed as arguments.",
    points: [
      {
        title: "Defining Functions",
        content: "Use def keyword. Functions return None by default unless a return statement is used.",
        code: `def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Hero"))  # Hello, Hero!`,
      },
      {
        title: "*args & **kwargs",
        content: "*args captures extra positional arguments as a tuple. **kwargs captures keyword arguments as a dict.",
        code: `def total(*nums):\n    return sum(nums)\n\ntotal(1, 2, 3)  # 6`,
      },
      {
        title: "Lambda Functions",
        content: "Anonymous single-expression functions. Often used with map(), filter().",
        code: `double = lambda x: x * 2\nprint(double(5))   # 10\n\nlist(map(lambda x: x**2, [1,2,3]))  # [1,4,9]`,
      },
      {
        title: "Scope",
        content: "Variables inside a function are local. Use global keyword to modify global variables.",
        code: `count = 0\ndef increment():\n    global count\n    count += 1`,
      },
    ],
    tip: "💡 Write docstrings (triple-quoted strings) right after def to document your functions.",
  },

  "py-4": {
    chapterId: "py-4",
    summary: "Python's built-in data structures — lists, tuples, sets, and dicts are the backbone of data management.",
    points: [
      {
        title: "Lists",
        content: "Ordered, mutable. Key methods: append(), pop(), remove(), sort(), len().",
        code: `items = [1, 2, 3]\nitems.append(4)      # [1,2,3,4]\nitems.pop()          # [1,2,3]\nitems[1:3]           # [2,3]`,
      },
      {
        title: "Dictionaries",
        content: "Key-value pairs. Access with dict[key] or dict.get(key). Keys must be hashable.",
        code: `hero = {"name": "Alex", "level": 7}\nhero["hp"] = 100\nhero.get("mp", 0)    # 0 (default)`,
      },
      {
        title: "Tuples & Sets",
        content: "Tuples are immutable sequences. Sets are unordered collections of unique elements.",
        code: `coords = (10, 20)    # tuple\nunique = {1, 2, 2, 3}  # {1, 2, 3}`,
      },
      {
        title: "List Comprehensions",
        content: "Compact syntax to build lists from iterables.",
        code: `squares = [x**2 for x in range(5)]  # [0,1,4,9,16]\nevens = [x for x in range(10) if x % 2 == 0]`,
      },
    ],
    tip: "💡 Use dict.items() to iterate both keys and values: for k, v in d.items().",
  },

  "py-5": {
    chapterId: "py-5",
    summary: "File I/O lets your programs read from and write to files, enabling persistent data storage.",
    points: [
      {
        title: "Opening Files",
        content: "Use open(path, mode). Modes: 'r' (read), 'w' (write/overwrite), 'a' (append), 'b' (binary). Always use with for auto-close.",
        code: `with open("data.txt", "r") as f:\n    content = f.read()\n\nwith open("out.txt", "w") as f:\n    f.write("Hello!")`,
      },
      {
        title: "Reading Lines",
        content: "readlines() returns a list of lines. Iterate directly for memory efficiency.",
        code: `with open("data.txt") as f:\n    for line in f:\n        print(line.strip())`,
      },
      {
        title: "JSON Files",
        content: "json.load() reads JSON from a file; json.dump() writes Python objects as JSON.",
        code: `import json\nwith open("config.json") as f:\n    data = json.load(f)\n\njson.dump(data, open("out.json","w"))`,
      },
      {
        title: "Error Handling",
        content: "Wrap file ops in try/except to handle FileNotFoundError and other exceptions.",
        code: `try:\n    with open("missing.txt") as f:\n        data = f.read()\nexcept FileNotFoundError:\n    print("File not found!")`,
      },
    ],
    tip: "💡 Always use the with statement — it automatically closes the file even if an error occurs.",
  },

  // ─── ENGLISH ───────────────────────────────────────────
  "en-1": {
    chapterId: "en-1",
    summary: "Parts of Speech are the building blocks of every English sentence. Knowing them helps you write clearly.",
    points: [
      {
        title: "Nouns & Pronouns",
        content: "Nouns name people, places, things, or ideas. Pronouns replace nouns (he, she, they, it).",
        code: `Noun:    "The hero defeated the dragon."\nPronoun: "He defeated it."`,
      },
      {
        title: "Verbs & Adverbs",
        content: "Verbs express actions or states. Adverbs modify verbs, adjectives, or other adverbs (usually end in -ly).",
        code: `Verb:   "She runs fast."\nAdverb: "She runs very quickly."`,
      },
      {
        title: "Adjectives & Articles",
        content: "Adjectives describe nouns. Articles (a, an, the) are a special type of adjective.",
        code: `"The brave knight wore a shining armor."`,
      },
      {
        title: "Prepositions & Conjunctions",
        content: "Prepositions show relationships (in, on, at, by). Conjunctions join clauses (and, but, because, although).",
        code: `"He studies in the morning and practices at night."`,
      },
    ],
    tip: "💡 FANBOYS = For, And, Nor, But, Or, Yet, So — the 7 coordinating conjunctions.",
  },

  "en-2": {
    chapterId: "en-2",
    summary: "English has 12 tenses. Mastering them lets you describe actions in the past, present, and future precisely.",
    points: [
      {
        title: "Simple Tenses",
        content: "Simple Present (I eat), Simple Past (I ate), Simple Future (I will eat).",
        code: `Present: "She studies every day."\nPast:    "She studied yesterday."\nFuture:  "She will study tomorrow."`,
      },
      {
        title: "Continuous / Progressive",
        content: "Shows ongoing actions. Use be + verb-ing.",
        code: `"I am studying."     (Present Continuous)\n"I was studying."    (Past Continuous)`,
      },
      {
        title: "Perfect Tenses",
        content: "Shows completed actions. Use have/had/will have + past participle.",
        code: `"I have finished."   (Present Perfect)\n"I had finished."   (Past Perfect)`,
      },
      {
        title: "Active vs Passive Voice",
        content: "Active: subject does the action. Passive: subject receives the action (be + past participle).",
        code: `Active:  "The cat ate the mouse."\nPassive: "The mouse was eaten by the cat."`,
      },
    ],
    tip: "💡 Present Perfect (have + V3) links the past to now: 'I have lived here for 5 years.'",
  },

  "en-3": {
    chapterId: "en-3",
    summary: "A rich vocabulary and knowledge of literary devices makes your reading and writing more powerful.",
    points: [
      {
        title: "Synonyms & Antonyms",
        content: "Synonyms are words with similar meanings; antonyms have opposite meanings.",
        code: `Synonym: happy → joyful, content, elated\nAntonym: happy → sad, miserable, gloomy`,
      },
      {
        title: "Prefixes & Suffixes",
        content: "Prefixes change meaning (un-, re-, pre-). Suffixes change word class (-tion, -ly, -ness, -ful).",
        code: `un + happy  = unhappy\nhope + less = hopeless\nquick + ly  = quickly`,
      },
      {
        title: "Figures of Speech",
        content: "Simile (like/as), Metaphor (is), Personification (giving human traits to objects), Alliteration (repeated consonant).",
        code: `Simile:     "Brave as a lion"\nMetaphor:   "He is a lion in battle"\nPersonif.:  "The wind whispered secrets"`,
      },
      {
        title: "Context Clues",
        content: "Use surrounding words to deduce the meaning of unfamiliar vocabulary without a dictionary.",
        code: `"The miser, unwilling to spend a single coin, refused to buy food."\n→ miser = someone extremely stingy`,
      },
    ],
    tip: "💡 Learn 5 new words daily using spaced repetition — connect them to emotions or stories for better retention.",
  },

  // ─── APTITUDE ──────────────────────────────────────────
  "apt-1": {
    chapterId: "apt-1",
    summary: "Number series test your ability to recognize patterns. Look for arithmetic (+/-), geometric (*), or alternating rules.",
    points: [
      {
        title: "Arithmetic Sequences",
        content: "Each term differs by a constant (common difference d). Formula: a_n = a_1 + (n−1)d.",
        code: `2, 5, 8, 11, 14 ...  (d = +3)\n100, 90, 80, 70 ...  (d = -10)`,
      },
      {
        title: "Geometric Sequences",
        content: "Each term is multiplied by a constant ratio r. Formula: a_n = a_1 × r^(n−1).",
        code: `2, 4, 8, 16, 32 ...  (r = ×2)\n81, 27, 9, 3, 1 ...  (r = ÷3)`,
      },
      {
        title: "Mixed & Alternating Patterns",
        content: "Some sequences have two interleaved patterns or changing differences.",
        code: `1, 2, 4, 7, 11, 16 ...  (diff: +1, +2, +3, +4, +5)\n1, 3, 2, 4, 3, 5 ...    (two alternating series)`,
      },
      {
        title: "Squares & Cubes",
        content: "Memorize perfect squares (1–20) and cubes (1–10) — they appear frequently.",
        code: `Squares: 1,4,9,16,25,36,49,64,81,100\nCubes:   1,8,27,64,125,216,343`,
      },
    ],
    tip: "💡 Always find the difference between consecutive terms first. If the differences themselves form a pattern, you have a second-order sequence.",
  },

  "apt-2": {
    chapterId: "apt-2",
    summary: "Percentages, ratios, and financial math are the most tested topics in competitive exams.",
    points: [
      {
        title: "Percentages",
        content: "Percent means 'per hundred'. To find X% of N: (X/100) × N. % change = (change/original) × 100.",
        code: `20% of 150 = (20/100) × 150 = 30\n% increase: (new - old)/old × 100`,
      },
      {
        title: "Ratios & Proportions",
        content: "A:B means for every A parts there are B parts. Cross-multiply to solve proportions.",
        code: `a/b = c/d  →  a×d = b×c\nRatio 2:3, total 50 → 20 and 30`,
      },
      {
        title: "Profit & Loss",
        content: "Profit = SP - CP. Loss = CP - SP. Profit% = (Profit/CP) × 100.",
        code: `CP=100, SP=120 → Profit=20, Profit%=20%\nCP=100, SP=80  → Loss=20, Loss%=20%`,
      },
      {
        title: "Simple & Compound Interest",
        content: "SI = P×R×T/100. CI = P×(1 + R/100)^T − P. CI grows faster due to compounding.",
        code: `SI: P=1000, R=5%, T=3 → SI=150\nCI: P=1000, R=10%, T=2 → CI=210`,
      },
    ],
    tip: "💡 Learn these fraction↔percentage conversions by heart: 1/4=25%, 1/3≈33.3%, 2/3≈66.7%, 3/4=75%.",
  },

  "apt-3": {
    chapterId: "apt-3",
    summary: "Logical reasoning tests your ability to draw valid conclusions from given statements.",
    points: [
      {
        title: "Syllogisms",
        content: "Draw Venn diagrams to solve. If All A→B and All B→C, then All A→C.",
        code: `All dogs are animals.  (A⊂B)\nAll animals are living. (B⊂C)\n∴ All dogs are living. (A⊂C)`,
      },
      {
        title: "Blood Relations",
        content: "Map family trees. Use M/F labels. Common traps: gender assumptions.",
        code: `"A's father's sister's son" = A's cousin (maternal side)`,
      },
      {
        title: "Coding-Decoding",
        content: "Find the rule: letter shift, reverse alphabet, number substitution, or positional encoding.",
        code: `A=1, B=2...Z=26  (position)\nA→Z, B→Y...      (reverse)\nCAT → +1 → DBU   (shift)`,
      },
      {
        title: "Arrangements & Seating",
        content: "Draw a linear or circular arrangement. Fix one person and place others relatively.",
        code: `5 in a row: _ _ A _ _\nClue: B is 2nd to A's right → B is at A+2`,
      },
    ],
    tip: "💡 For circular arrangements of n people, the number of distinct arrangements = (n−1)! because one person is fixed.",
  },

  // ─── COMPUTER FUNDAMENTALS ─────────────────────────────
  "cf-1": {
    chapterId: "cf-1",
    summary: "A computer takes input, processes it with the CPU, stores it in memory and returns output.",
    points: [
      { title: "CPU", content: "The Central Processing Unit runs instructions. It has the ALU (arithmetic & logic) and the CU (control unit) that fetches, decodes and executes." },
      { title: "Memory Types", content: "RAM is fast but volatile (lost on power off). ROM is permanent. Disks (HDD/SSD) hold long-term data. Cache sits between CPU and RAM." },
      { title: "Units of Storage", content: "8 bits = 1 byte. 1024 bytes = 1 KB, 1024 KB = 1 MB, 1024 MB = 1 GB.", code: `8 bits  = 1 Byte\n1024 B  = 1 KB\n1024 KB = 1 MB\n1024 MB = 1 GB` },
      { title: "Binary Numbers", content: "Computers store everything as 0s and 1s. Each position is a power of 2.", code: `1010 = 8 + 0 + 2 + 0 = 10` },
      { title: "Input vs Output", content: "Input devices send data in (keyboard, mouse, scanner). Output devices show results (monitor, printer, speaker)." },
    ],
    tip: "💡 Remember the flow: Input → Process (CPU) → Storage (RAM/Disk) → Output.",
  },
  "cf-2": {
    chapterId: "cf-2",
    summary: "An operating system manages hardware, memory, processes and files so applications can run safely.",
    points: [
      { title: "Process", content: "A program stored on disk is passive; a program in execution is a process with its own memory space." },
      { title: "Scheduling", content: "FCFS runs in arrival order, SJF picks the shortest job, Round Robin gives each process a time slice, Priority runs the most important first." },
      { title: "Deadlock", content: "Occurs when four conditions hold together: mutual exclusion, hold & wait, no preemption and circular wait. Break any one to avoid it." },
      { title: "Virtual Memory", content: "The OS uses disk space (swap) as extra RAM, moving pages in and out as needed." },
      { title: "File Systems", content: "Files are stored in blocks on disk. The smallest unit of data is the bit; the OS groups them into bytes, blocks and clusters." },
    ],
    tip: "💡 On Linux, `ls` lists files, `cd` changes directory and `ps` shows running processes.",
  },
  "cf-3": {
    chapterId: "cf-3",
    summary: "Networking connects computers so they can exchange data using agreed protocols.",
    points: [
      { title: "IP & DNS", content: "Every device has an IP address. DNS is the internet phonebook that turns names like example.com into IP addresses." },
      { title: "Protocols", content: "HTTP (port 80) serves web pages, HTTPS (port 443) adds encryption, FTP (21) transfers files, SMTP (25) sends mail." },
      { title: "TCP vs UDP", content: "TCP is connection-oriented and reliable (handshake, retries, ordering). UDP is connectionless and faster, used for streaming and games." },
      { title: "OSI Layers", content: "Physical → Data Link → Network (routing, IP) → Transport (TCP/UDP) → Session → Presentation → Application." },
      { title: "Network Devices", content: "Hubs broadcast, switches forward by MAC address, routers connect different networks, repeaters extend range." },
    ],
    tip: "💡 Private IP ranges (10.x.x.x, 172.16–31.x.x, 192.168.x.x) never appear on the public internet.",
  },

  // ─── WEB DEVELOPMENT ───────────────────────────────────
  "web-1": {
    chapterId: "web-1",
    summary: "HTML gives a page its structure using semantic tags and attributes.",
    points: [
      { title: "Document Structure", content: "Every page has <html>, a <head> for metadata and a <body> for visible content.", code: `<!DOCTYPE html>\n<html>\n  <head><title>My Page</title></head>\n  <body><h1>Hello</h1></body>\n</html>` },
      { title: "Headings & Text", content: "<h1> is the biggest and most important heading, down to <h6>. Use only one <h1> per page." },
      { title: "Links & Images", content: "<a href> creates a hyperlink; <img src alt> shows an image. `alt` text is required for accessibility.", code: `<a href="/about">About</a>\n<img src="hero.jpg" alt="Hero character" />` },
      { title: "Semantic Tags", content: "<header>, <nav>, <main>, <section>, <article>, <footer> describe meaning, which helps SEO and screen readers." },
      { title: "Forms", content: "<input> types include text, email, password, date, checkbox and radio. Self-closing tags have no inner content." },
    ],
    tip: "💡 Semantic HTML is free SEO — search engines understand <nav> and <article> far better than <div>.",
  },
  "web-2": {
    chapterId: "web-2",
    summary: "CSS controls presentation: colours, spacing, typography and layout.",
    points: [
      { title: "Selectors", content: "`.class` targets a class, `#id` targets an id, `tag` targets elements. Specificity order: inline > id > class > element.", code: `.card { color: red; }\n#hero { color: blue; }` },
      { title: "Box Model", content: "From inside out: content → padding → border → margin. Margin is the space outside the border, between elements." },
      { title: "Units", content: "px is fixed, em is relative to the parent font size, rem is relative to the root font size, % is relative to the container." },
      { title: "Flexbox & Grid", content: "display:flex lays items in a row or column; display:grid builds two-dimensional layouts.", code: `.row { display: flex; gap: 1rem; justify-content: space-between; }` },
      { title: "Responsive Design", content: "@media queries apply styles at specific screen sizes.", code: `@media (max-width: 768px) {\n  .row { flex-direction: column; }\n}` },
    ],
    tip: "💡 Prefer rem for font sizes — the whole layout then scales with the user's browser settings.",
  },
  "web-3": {
    chapterId: "web-3",
    summary: "JavaScript makes pages interactive — variables, functions, arrays, the DOM and async code.",
    points: [
      { title: "Variables", content: "`let` and `const` are block-scoped; `var` is function-scoped and should be avoided.", code: `let count = 0;\nconst NAME = "Hero";` },
      { title: "Equality", content: "=== compares value AND type; == coerces types. Always prefer ===. Quirk: typeof null === 'object'." },
      { title: "Arrays", content: "push() adds at the end, pop() removes from the end, shift()/unshift() work at the start. map(), filter() and reduce() return new values.", code: `[1,2,3].map(n => n * 2) // [2,4,6]` },
      { title: "DOM", content: "querySelector() picks one element, querySelectorAll() picks many. addEventListener() handles clicks and input.", code: `document.querySelector("#btn")\n  .addEventListener("click", () => alert("Hi"));` },
      { title: "Async", content: "Promises represent future values. async/await makes asynchronous code read like synchronous code.", code: `const res = await fetch("/api");\nconst data = await res.json();` },
    ],
    tip: "💡 JSON.stringify turns an object into a string; JSON.parse turns a string back into an object.",
  },

  // ─── GENERAL AWARENESS ─────────────────────────────────
  "gk-1": {
    chapterId: "gk-1",
    summary: "Core facts about our planet, science and the human body that appear in almost every exam.",
    points: [
      { title: "Solar System", content: "Mars is the Red Planet (iron oxide dust). Mercury is closest to the Sun; Jupiter is the largest planet." },
      { title: "Geography", content: "There are 7 continents and 5 oceans. The Pacific is the largest ocean; the Nile is the longest river." },
      { title: "Basic Science", content: "Plants absorb carbon dioxide and release oxygen during photosynthesis. Mercury is the only metal liquid at room temperature." },
      { title: "Human Body", content: "The heart pumps blood, lungs exchange gases, kidneys filter waste and the liver detoxifies." },
      { title: "Famous Scientists", content: "Newton — laws of motion and gravity. Einstein — relativity (E = mc²). Galileo — telescope observations." },
    ],
    tip: "💡 Group facts by theme (planets, rivers, organs) — themed clusters are far easier to recall than random lists.",
  },
  "gk-2": {
    chapterId: "gk-2",
    summary: "Communication skills decide how your knowledge is received — in emails, meetings and interviews.",
    points: [
      { title: "Formal Writing", content: "Open with 'Dear Sir/Madam,' or 'Dear <Name>,' and close with 'Kind regards,'. Keep one idea per paragraph." },
      { title: "Active Listening", content: "Focus fully on the speaker instead of preparing your reply. Confirm understanding by paraphrasing back." },
      { title: "Non-verbal Signals", content: "Eye contact, posture, tone and gestures carry a large part of the message — even before you speak." },
      { title: "The STAR Method", content: "Answer behavioural interview questions as Situation → Task → Action → Result. Always finish with the measurable result." },
      { title: "Handling Feedback", content: "Listen, ask for specific examples, thank the person, then act. Never argue in the moment." },
    ],
    tip: "💡 For 'Tell me about yourself', give a 60-second career story tailored to the role — not your life history.",
  },

  // ─── PHYSICS ───────────────────────────────────────────
  "phy-1": {
    chapterId: "phy-1",
    summary: "Motion describes how position changes with time. Use the lab below — tap the road and the stopwatch to see speed change live.",
    points: [
      { title: "Distance & Displacement", content: "Distance is total path length (scalar). Displacement is the straight-line change in position with direction (vector)." },
      { title: "Speed", content: "Speed = distance ÷ time, measured in m/s. Tapping the distance object up while keeping time fixed makes the car move faster in the lab.", code: `speed = 100 m ÷ 10 s = 10 m/s` },
      { title: "Velocity", content: "Velocity is speed with a direction. Two cars at 10 m/s in opposite directions have different velocities." },
      { title: "Acceleration", content: "Acceleration = change in velocity ÷ time, in m/s². Zero acceleration means constant velocity.", code: `a = (v_final − v_initial) ÷ t` },
    ],
    tip: "💡 In the lab, double the time and watch the speed halve — the relationship is inverse.",
  },
  "phy-2": {
    chapterId: "phy-2",
    summary: "Forces change motion. Newton's three laws explain every push and pull — tap the rock and rocket below to feel F = m × a.",
    points: [
      { title: "First Law (Inertia)", content: "An object stays at rest or in uniform motion unless a net external force acts on it." },
      { title: "Second Law", content: "F = m × a. Heavier objects need more force for the same acceleration — increase mass in the lab and watch force jump.", code: `F = 5 kg × 3 m/s² = 15 N` },
      { title: "Third Law", content: "Every action has an equal and opposite reaction. A rocket pushes gas down; gas pushes the rocket up." },
      { title: "Weight & Friction", content: "Weight W = mg (g ≈ 9.8 m/s²). Friction always opposes relative motion between surfaces." },
      { title: "Momentum", content: "p = m × v. In collisions, total momentum is conserved when no external force acts." },
    ],
    tip: "💡 Force is measured in Newtons: 1 N accelerates 1 kg at 1 m/s².",
  },
  "phy-3": {
    chapterId: "phy-3",
    summary: "Energy is the capacity to do work. Tap mass, velocity and height in the lab to see kinetic and potential energy respond.",
    points: [
      { title: "Work", content: "W = F × d (force along displacement), measured in Joules. No displacement means no work done." },
      { title: "Kinetic Energy", content: "KE = ½mv². Because v is squared, doubling speed makes energy four times larger.", code: `KE = 0.5 × 4 kg × (6 m/s)² = 72 J` },
      { title: "Potential Energy", content: "PE = mgh near Earth's surface. Lifting an object stores energy that gravity can release.", code: `PE = 4 × 9.8 × 10 = 392 J` },
      { title: "Power", content: "Power = work ÷ time, in Watts. Doing the same work faster needs more power." },
      { title: "Conservation of Energy", content: "Energy is never created or destroyed — only transformed between forms (PE → KE → heat)." },
    ],
    tip: "💡 A falling ball converts PE into KE — the total stays roughly constant if we ignore air resistance.",
  },

  // ─── CHEMISTRY ─────────────────────────────────────────
  "chem-1": {
    chapterId: "chem-1",
    summary: "All matter is built from atoms. Elements, compounds and mixtures differ in how those atoms are joined.",
    points: [
      { title: "Atomic Structure", content: "An atom has a nucleus of protons (+) and neutrons (0), surrounded by electrons (−) in shells." },
      { title: "Atomic Number & Mass", content: "Atomic number = number of protons and defines the element. Mass number = protons + neutrons." },
      { title: "Elements & Symbols", content: "Each element has a 1–2 letter symbol: H (hydrogen), O (oxygen), Na (sodium), Fe (iron), Cu (copper)." },
      { title: "Compounds vs Mixtures", content: "A compound is chemically bonded with fixed ratios (H₂O). A mixture is physically combined and separable (sand + salt)." },
    ],
    tip: "💡 Water is a compound; salty water is a mixture — you can boil the water off and get salt back.",
  },
  "chem-2": {
    chapterId: "chem-2",
    summary: "In a reaction, reactants rearrange into new products. Use the mixing lab below — pick two chemicals, hit Mix, and watch the colour change.",
    points: [
      { title: "Reactants → Products", content: "Left of the arrow are reactants, right are products. Atoms are rearranged, never lost — mass is conserved." },
      { title: "Synthesis", content: "Two substances combine into one: 2Na + Cl₂ → 2NaCl (white table salt). Try it in the lab." },
      { title: "Oxidation", content: "Iron reacting with oxygen and water forms rust, 4Fe + 3O₂ → 2Fe₂O₃ — the orange-brown flakes." },
      { title: "Displacement", content: "A more reactive metal replaces a less reactive one: Fe + CuSO₄ → FeSO₄ + Cu. Blue fades to pale green." },
      { title: "Energy Changes", content: "Exothermic reactions release heat (burning); endothermic reactions absorb it (cold packs)." },
    ],
    tip: "💡 The colour of a solution is a strong clue about which compound formed — copper salts are blue, iron(III) compounds are orange-brown.",
  },
  "chem-3": {
    chapterId: "chem-3",
    summary: "Acids and bases sit on the pH scale from 0 to 14. Mixing them neutralises to salt and water — try vinegar + baking soda in the lab.",
    points: [
      { title: "The pH Scale", content: "pH < 7 is acidic, pH = 7 is neutral, pH > 7 is alkaline (basic). Each step is a 10× change in acidity." },
      { title: "Indicators", content: "Blue litmus turns red in acid; red litmus turns blue in base. Universal indicator: red (strong acid) → green (neutral) → purple (strong base)." },
      { title: "Common Acids & Bases", content: "Acids: vinegar, lemon juice, HCl. Bases: baking soda, soap, NaOH." },
      { title: "Neutralisation", content: "Acid + base → salt + water. HCl + NaOH → NaCl + H₂O.", code: `CH₃COOH + NaHCO₃ → CH₃COONa + H₂O + CO₂↑` },
    ],
    tip: "💡 The fizz when vinegar meets baking soda is carbon dioxide gas escaping.",
  },
};


