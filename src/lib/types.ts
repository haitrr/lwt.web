export type Language = {
  name: string;
  code: string;
  speakCode: string;
};

export type TextItem = {
  id: number;
  title: string;
  languageCode: string;
  termCount: number;
  processedTermCount: number;
  bookmark: number | null;
  createdAt: string;
};

export type TextList = {
  total: number;
  items: TextItem[];
};

export type TextEditDetail = {
  title: string;
  languageCode: string;
  content: string;
};

export const LearningLevel = {
  Skipped: 'skipped',
  Ignored: 'ignored',
  Unknown: 'unknown',
  Learning1: 'learning-1',
  Learning2: 'learning-2',
  Learning3: 'learning-3',
  Learning4: 'learning-4',
  Learning5: 'learning-5',
  WellKnown: 'well-known',
} as const;

export type LearningLevel = (typeof LearningLevel)[keyof typeof LearningLevel];

export type TermCounts = Partial<Record<LearningLevel, number>>;

export type TextReadInfo = {
  id: number;
  title: string;
  languageCode: string;
  bookmark: number | null;
  termCount: number;
};

/** One token of a text in reading order; id/meaning/count are set when it is a real term. */
export type TextTermView = {
  id: number | null;
  content: string;
  learningLevel: LearningLevel;
  index: number;
  meaning: string | null;
  count: number | null;
};

export type TermView = {
  id: number;
  content: string;
  meaning: string;
  learningLevel: LearningLevel;
  languageCode: string;
};

export const LEARNING_LEVELS = Object.values(LearningLevel);

export function isLearningLevel(value: string): value is LearningLevel {
  return (LEARNING_LEVELS as string[]).includes(value);
}
