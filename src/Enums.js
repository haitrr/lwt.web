export const TermLearningLevel = {
  Skipped: "skipped",

  Ignored: "ignored",

  UnKnow: "unknown",

  Learning1: "learning-1",

  Learning2: "learning-2",

  Learning3: "learning-3",

  Learning4: "learning-4",

  Learning5: "learning-5",

  WellKnow: "well-known"
};

export const LanguageCode = {
  English: "en"
};

export const TermLearningColor = {
  [TermLearningLevel.Skipped]: "white",

  [TermLearningLevel.Ignored]: "white",

  [TermLearningLevel.UnKnow]: "#addfff",

  [TermLearningLevel.Learning1]: "#f5b8a9",

  [TermLearningLevel.Learning2]: "#f5cca9",

  [TermLearningLevel.Learning3]: "#f5e1a9",

  [TermLearningLevel.Learning4]: "#f5f3a9",

  [TermLearningLevel.Learning5]: "#ddffdd",

  [TermLearningLevel.WellKnow]: "whitesmoke"
};
