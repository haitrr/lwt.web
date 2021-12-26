import styles from './Components/Term/Term.module.scss';

export const TermLearningLevel: { [key: string]: string } = {
  Skipped: 'skipped',

  Ignored: 'ignored',

  UnKnow: 'unknown',

  Learning1: 'learning-1',

  Learning2: 'learning-2',

  Learning3: 'learning-3',

  Learning4: 'learning-4',

  Learning5: 'learning-5',

  WellKnow: 'well-known',
};

export const LearningTermLevels = [
  TermLearningLevel.UnKnow,
  TermLearningLevel.Learning1,
  TermLearningLevel.Learning2,
  TermLearningLevel.Learning3,
  TermLearningLevel.Learning4,
  TermLearningLevel.Learning5,
];

export const LanguageCode = {
  English: 'en',
};

export const TermLearningColor = {
  [TermLearningLevel.Skipped]: styles.termSkipped,

  [TermLearningLevel.Ignored]: styles.termIgnored,

  [TermLearningLevel.UnKnow]: styles.termUnknown,

  [TermLearningLevel.Learning1]: styles.termLearning1,

  [TermLearningLevel.Learning2]: styles.termLearning2,

  [TermLearningLevel.Learning3]: styles.termLearning3,

  [TermLearningLevel.Learning4]: styles.termLearning4,

  [TermLearningLevel.Learning5]: styles.termLearning5,

  [TermLearningLevel.WellKnow]: styles.termWellKnown,
};

export const TermLearningLevelShortcut = {
  [TermLearningLevel.Skipped]: 'S',

  [TermLearningLevel.Ignored]: 'I',

  [TermLearningLevel.UnKnow]: 'UK',

  [TermLearningLevel.Learning1]: 'I',

  [TermLearningLevel.Learning2]: 'II',

  [TermLearningLevel.Learning3]: 'II',

  [TermLearningLevel.Learning4]: 'IV',

  [TermLearningLevel.Learning5]: 'V',

  [TermLearningLevel.WellKnow]: 'WK',
};

export const getNextLearningLevel = (learningLevel: string) => {
  switch (learningLevel) {
    case TermLearningLevel.UnKnow:
      return TermLearningLevel.Learning1;
    case TermLearningLevel.Learning1:
      return TermLearningLevel.Learning2;
    case TermLearningLevel.Learning2:
      return TermLearningLevel.Learning3;
    case TermLearningLevel.Learning3:
      return TermLearningLevel.Learning4;
    case TermLearningLevel.Learning4:
      return TermLearningLevel.Learning5;
    case TermLearningLevel.Learning5:
      return TermLearningLevel.WellKnow;
    default:
      return learningLevel;
  }
};

export const getPreviousLearningLevel = (learningLevel: string) => {
  switch (learningLevel) {
    case TermLearningLevel.UnKnow:
      return TermLearningLevel.Ignored;
    case TermLearningLevel.Learning1:
      return TermLearningLevel.UnKnow;
    case TermLearningLevel.Learning2:
      return TermLearningLevel.Learning1;
    case TermLearningLevel.Learning3:
      return TermLearningLevel.Learning2;
    case TermLearningLevel.Learning4:
      return TermLearningLevel.Learning3;
    case TermLearningLevel.Learning5:
      return TermLearningLevel.Learning4;
    case TermLearningLevel.WellKnow:
      return TermLearningLevel.Learning5;
    default:
      return learningLevel;
  }
};

export const isLearningTerm = (learningLevel: string) => LearningTermLevels.includes(learningLevel);

export const importantColors = [
  '#E50027',
  '#E5000F',
  '#E50800',
  '#E52000',
  '#E53800',
  '#E55000',
  '#E56800',
  '#E68000',
  '#E69701',
  '#E6AF01',
  '#E6C701',
  '#E6DF01',
  '#D6E601',
  '#BEE701',
  '#A7E701',
  '#8FE702',
  '#77E702',
  '#60E702',
  '#48E702',
  '#31E802',
  '#19E802',
  '#02E803',
  '#03E81B',
  '#03E833',
  '#03E84B',
  '#03E963',
  '#03E97B',
  '#03E993',
  '#03E9AB',
  '#04E9C3',
  '#04E9DB',
  '#04E0EA',
  '#04C9EA',
  '#04B1EA',
  '#0499EA',
  '#0482EA',
  '#056AEA',
  '#0553EB',
  '#053BEB',
  '#0523EB',
  '#050CEB',
  '#1705EB',
  '#2F05EB',
  '#4706EC',
  '#5F06EC',
  '#7706EC',
  '#8F06EC',
  '#A706EC',
  '#BF06EC',
  '#D707ED',
];
