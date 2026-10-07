import type { Question } from "./gameData";

export const computerChapter1Questions: Question[] = [
  { id: "cf-1-1", text: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Print Unit", "Control Program Unit"], correctAnswer: 0, hint: "It is the brain of the computer", xpReward: 20, coinReward: 5 },
  { id: "cf-1-2", text: "Which memory is volatile?", options: ["ROM", "RAM", "SSD", "HDD"], correctAnswer: 1, hint: "It loses data when power goes off", xpReward: 25, coinReward: 5 },
  { id: "cf-1-3", text: "1 Byte equals how many bits?", options: ["4", "8", "16", "32"], correctAnswer: 1, hint: "Two nibbles", xpReward: 20, coinReward: 5 },
  { id: "cf-1-4", text: "Which is an input device?", options: ["Monitor", "Printer", "Keyboard", "Speaker"], correctAnswer: 2, hint: "You type on it", xpReward: 20, coinReward: 5 },
  { id: "cf-1-5", text: "Which unit performs arithmetic operations?", options: ["ALU", "CU", "RAM", "BIOS"], correctAnswer: 0, hint: "Arithmetic Logic Unit", xpReward: 25, coinReward: 10 },
  { id: "cf-1-6", text: "Binary 1010 equals which decimal?", options: ["8", "10", "12", "14"], correctAnswer: 1, hint: "8 + 0 + 2 + 0", xpReward: 30, coinReward: 10 },
  { id: "cf-1-7", text: "Which is system software?", options: ["MS Word", "Operating System", "Photoshop", "Chrome"], correctAnswer: 1, hint: "It manages hardware", xpReward: 25, coinReward: 10 },
  { id: "cf-1-8", text: "🗝️ TREASURE HUNT: 1 GB equals how many MB?", options: ["100", "512", "1024", "2048"], correctAnswer: 2, hint: "Powers of 2", xpReward: 40, coinReward: 20 },
];

export const computerChapter2Questions: Question[] = [
  { id: "cf-2-1", text: "Which OS is open source?", options: ["Windows", "macOS", "Linux", "iOS"], correctAnswer: 2, hint: "Penguin mascot", xpReward: 25, coinReward: 5 },
  { id: "cf-2-2", text: "What does an operating system NOT do?", options: ["Manage memory", "Schedule processes", "Compile designs in Photoshop", "Handle files"], correctAnswer: 2, hint: "That's an application task", xpReward: 25, coinReward: 10 },
  { id: "cf-2-3", text: "A program in execution is called a…", options: ["File", "Process", "Thread pool", "Driver"], correctAnswer: 1, hint: "Not the same as the stored program", xpReward: 30, coinReward: 10 },
  { id: "cf-2-4", text: "Which scheduling runs the shortest job first?", options: ["FCFS", "SJF", "Round Robin", "Priority"], correctAnswer: 1, hint: "The name says it", xpReward: 30, coinReward: 10 },
  { id: "cf-2-5", text: "Deadlock needs which condition?", options: ["Preemption", "Circular wait", "Fast CPU", "Large RAM"], correctAnswer: 1, hint: "Processes waiting in a cycle", xpReward: 35, coinReward: 15 },
  { id: "cf-2-6", text: "Virtual memory uses which storage?", options: ["Cache", "Registers", "Disk", "ROM"], correctAnswer: 2, hint: "Swap space lives there", xpReward: 30, coinReward: 10 },
  { id: "cf-2-7", text: "Which is the smallest storage unit in a file system?", options: ["Block", "Sector", "Bit", "Cluster"], correctAnswer: 2, hint: "0 or 1", xpReward: 25, coinReward: 5 },
  { id: "cf-2-8", text: "🗝️ TREASURE HUNT: Which command lists files on Linux?", options: ["dir", "ls", "list", "show"], correctAnswer: 1, hint: "Two letters", xpReward: 40, coinReward: 20 },
];

export const computerChapter3Questions: Question[] = [
  { id: "cf-3-1", text: "What does IP stand for?", options: ["Internet Protocol", "Internal Path", "Input Process", "Inter Program"], correctAnswer: 0, hint: "Addresses on the internet", xpReward: 20, coinReward: 5 },
  { id: "cf-3-2", text: "Which protocol is used for secure web pages?", options: ["HTTP", "FTP", "HTTPS", "SMTP"], correctAnswer: 2, hint: "The S means secure", xpReward: 25, coinReward: 5 },
  { id: "cf-3-3", text: "DNS converts domain names into…", options: ["MAC addresses", "IP addresses", "Port numbers", "Cookies"], correctAnswer: 1, hint: "It's the internet phonebook", xpReward: 30, coinReward: 10 },
  { id: "cf-3-4", text: "Which device connects two different networks?", options: ["Hub", "Switch", "Router", "Repeater"], correctAnswer: 2, hint: "Sits at your home internet box", xpReward: 25, coinReward: 10 },
  { id: "cf-3-5", text: "Which layer of OSI handles routing?", options: ["Physical", "Network", "Session", "Application"], correctAnswer: 1, hint: "Layer 3", xpReward: 35, coinReward: 15 },
  { id: "cf-3-6", text: "TCP is best described as…", options: ["Connectionless", "Reliable & connection-oriented", "Only for video", "A hardware chip"], correctAnswer: 1, hint: "It does handshakes and retries", xpReward: 30, coinReward: 10 },
  { id: "cf-3-7", text: "Default port of HTTP?", options: ["21", "25", "80", "443"], correctAnswer: 2, hint: "443 is for HTTPS", xpReward: 30, coinReward: 10 },
  { id: "cf-3-8", text: "🗝️ TREASURE HUNT: Which is a private IP range?", options: ["8.8.8.0", "192.168.0.0", "172.15.0.0", "11.0.0.0"], correctAnswer: 1, hint: "You see it on home routers", xpReward: 40, coinReward: 20 },
];
