import React from 'react';
import { importantColors } from '../../../Enums';
import { Term } from '../../../Reducers/TextReducer';
import styles from './Title.module.scss';

interface Props {
  term: Term;
}

const Title: React.FC<Props> = ({ term }) => {
  const importantLevel = Math.min(term.count, 49);
  return (
    <span>
      {term.count ? (
        <div style={{ color: importantColors[importantLevel] }}>{`${term.count} in this text.`}</div>
      ) : (
        <div>Loading term count</div>
      )}
      <hr />
      <div className={styles.meaning}>{term.meaning}</div>
      <hr />
    </span>
  );
};

export default Title;
