import React from 'react';
import styles from './Term.module.scss';
import { LAST_BEGIN_INDEX_ID } from './TermButton';
import { Term } from '../../Reducers/TextReducer';

interface Props {
  term: Term;
  isLastBeginTerm: boolean;
}

const SkippedTerm: React.FC<Props> = ({ term, isLastBeginTerm }) => {
  return (
    <span className={styles.term} id={isLastBeginTerm ? LAST_BEGIN_INDEX_ID : undefined}>
      {term.content}
    </span>
  );
};

export default SkippedTerm;
