export interface KidsForestState {
  /** total seconds spent learning in the Kids Zone */
  seconds: number;
  /** total correct answers given */
  correct: number;
}

const STORAGE_KEY = "kids-forest";

export const TREE_KINDS = ["🌳", "🌲", "🌴", "🎄", "🌵", "🌱"] as const;

const empty: KidsForestState = { seconds: 0, correct: 0 };

export const getForest = (): KidsForestState => {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (!raw || typeof raw !== "object") return { ...empty };
    return { seconds: Number(raw.seconds) || 0, correct: Number(raw.correct) || 0 };
  } catch {
    return { ...empty };
  }
};

const save = (state: KidsForestState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent("kids-forest-updated"));
};

/** 1 tree for every full minute of learning */
export const treesFromTime = (seconds: number) => Math.floor(seconds / 60);
/** 1 tree for every 3 correct answers */
export const treesFromCorrect = (correct: number) => Math.floor(correct / 3);

export const getForestStats = (state = getForest()) => {
  const timeTrees = treesFromTime(state.seconds);
  const answerTrees = treesFromCorrect(state.correct);
  return {
    ...state,
    timeTrees,
    answerTrees,
    total: timeTrees + answerTrees,
    secondsToNextTree: 60 - (state.seconds % 60),
    correctToNextTree: 3 - (state.correct % 3),
  };
};

export const addForestSeconds = (seconds: number) => {
  if (seconds <= 0) return;
  const state = getForest();
  save({ ...state, seconds: state.seconds + Math.round(seconds) });
};

export const addForestCorrect = (count = 1) => {
  const state = getForest();
  save({ ...state, correct: state.correct + count });
};
