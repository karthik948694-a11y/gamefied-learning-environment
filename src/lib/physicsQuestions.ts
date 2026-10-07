import type { Question } from "./gameData";

export const physicsChapter1Questions: Question[] = [
  { id: "phy-1-1", text: "Speed is calculated as…", options: ["distance × time", "distance ÷ time", "time ÷ distance", "distance + time"], correctAnswer: 1, hint: "Play with the lab: raising distance raises speed", xpReward: 25, coinReward: 5 },
  { id: "phy-1-2", text: "A car covers 100 m in 5 s. Its speed is:", options: ["20 m/s", "500 m/s", "5 m/s", "0.05 m/s"], correctAnswer: 0, hint: "100 ÷ 5", xpReward: 30, coinReward: 10 },
  { id: "phy-1-3", text: "Velocity differs from speed because velocity has…", options: ["mass", "direction", "energy", "temperature"], correctAnswer: 1, hint: "It is a vector", xpReward: 25, coinReward: 5 },
  { id: "phy-1-4", text: "Acceleration is the rate of change of…", options: ["distance", "velocity", "mass", "force"], correctAnswer: 1, hint: "Δv / Δt", xpReward: 25, coinReward: 5 },
  { id: "phy-1-5", text: "The SI unit of acceleration is:", options: ["m/s", "m/s²", "N", "J"], correctAnswer: 1, hint: "Velocity per second", xpReward: 25, coinReward: 5 },
  { id: "phy-1-6", text: "If an object moves at constant velocity, its acceleration is:", options: ["Increasing", "Zero", "Negative always", "Equal to speed"], correctAnswer: 1, hint: "No change in velocity", xpReward: 30, coinReward: 10 },
  { id: "phy-1-7", text: "Distance travelled at constant speed v for time t is:", options: ["v/t", "v × t", "t/v", "v + t"], correctAnswer: 1, hint: "Rearranged speed formula", xpReward: 25, coinReward: 5 },
  { id: "phy-1-8", text: "A scalar quantity has…", options: ["Only magnitude", "Only direction", "Both", "Neither"], correctAnswer: 0, hint: "Speed is scalar", xpReward: 25, coinReward: 5 },
];

export const physicsChapter2Questions: Question[] = [
  { id: "phy-2-1", text: "Newton's second law states:", options: ["F = m/a", "F = m × a", "F = a/m", "F = m + a"], correctAnswer: 1, hint: "Force grows with mass and acceleration", xpReward: 30, coinReward: 10 },
  { id: "phy-2-2", text: "The SI unit of force is:", options: ["Joule", "Watt", "Newton", "Pascal"], correctAnswer: 2, hint: "Named after the same scientist", xpReward: 25, coinReward: 5 },
  { id: "phy-2-3", text: "A 2 kg object accelerating at 3 m/s² feels a force of:", options: ["6 N", "1.5 N", "5 N", "0.66 N"], correctAnswer: 0, hint: "2 × 3", xpReward: 30, coinReward: 10 },
  { id: "phy-2-4", text: "Newton's first law is also called the law of:", options: ["Gravity", "Inertia", "Momentum", "Friction"], correctAnswer: 1, hint: "Objects resist change of motion", xpReward: 25, coinReward: 5 },
  { id: "phy-2-5", text: "Every action has an equal and opposite…", options: ["Mass", "Reaction", "Energy", "Velocity"], correctAnswer: 1, hint: "Third law", xpReward: 25, coinReward: 5 },
  { id: "phy-2-6", text: "Weight of a mass m on Earth is:", options: ["m × 9.8", "m ÷ 9.8", "9.8 ÷ m", "m + 9.8"], correctAnswer: 0, hint: "W = mg", xpReward: 25, coinReward: 5 },
  { id: "phy-2-7", text: "Friction always acts…", options: ["With the motion", "Against the motion", "Upward", "Downward"], correctAnswer: 1, hint: "It opposes sliding", xpReward: 25, coinReward: 5 },
  { id: "phy-2-8", text: "Momentum equals:", options: ["m × v", "m × a", "F × t only", "v ÷ m"], correctAnswer: 0, hint: "Mass times velocity", xpReward: 30, coinReward: 10 },
];

export const physicsChapter3Questions: Question[] = [
  { id: "phy-3-1", text: "Kinetic energy is given by:", options: ["mgh", "½mv²", "mv", "Fd/t"], correctAnswer: 1, hint: "Depends on velocity squared", xpReward: 30, coinReward: 10 },
  { id: "phy-3-2", text: "Potential energy near Earth's surface is:", options: ["½mv²", "mgh", "mv", "F/a"], correctAnswer: 1, hint: "Height matters", xpReward: 25, coinReward: 5 },
  { id: "phy-3-3", text: "The SI unit of energy is:", options: ["Newton", "Joule", "Watt", "Volt"], correctAnswer: 1, hint: "1 N·m", xpReward: 25, coinReward: 5 },
  { id: "phy-3-4", text: "Work done = force ×", options: ["time", "mass", "displacement", "speed"], correctAnswer: 2, hint: "W = F·d", xpReward: 25, coinReward: 5 },
  { id: "phy-3-5", text: "Power is:", options: ["Work × time", "Work ÷ time", "Force ÷ time", "Energy × time"], correctAnswer: 1, hint: "Rate of doing work", xpReward: 25, coinReward: 5 },
  { id: "phy-3-6", text: "Doubling velocity changes kinetic energy by a factor of:", options: ["2", "3", "4", "1"], correctAnswer: 2, hint: "v is squared", xpReward: 30, coinReward: 10 },
  { id: "phy-3-7", text: "Energy can be…", options: ["Created", "Destroyed", "Transformed only", "Ignored"], correctAnswer: 2, hint: "Law of conservation", xpReward: 25, coinReward: 5 },
  { id: "phy-3-8", text: "The SI unit of power is:", options: ["Joule", "Watt", "Newton", "Hertz"], correctAnswer: 1, hint: "1 J/s", xpReward: 25, coinReward: 5 },
];
