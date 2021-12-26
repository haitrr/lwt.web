import React from 'react';
import { connect, useSelector } from 'react-redux';
import styles from './TextReadPage.module.scss';
import { RootState } from '../../../RootReducer';
import useTermCounts from '../../../Hooks/useTermCounts';
import useTextTermsCount from '../../../Hooks/useTextTermsCount';
import Loading from '../../Loading/Loading';

interface StateProps {
  textId: number;
}

type Props = StateProps;

const ProgressBar: React.FC<Props> = ({ textId }) => {
  const { termCount: total } = useTextTermsCount(textId);
  const { current } = useSelector((state: RootState) => {
    if (!state.text.readingText) throw new Error();
    return {
      current: state.text.readingText.viewingTermIndex,
    };
  });

  if (!total) {
    return <Loading />;
  }

  return (
    <div className={styles.progress}>
      <div
        style={{
          height: `${(current * 100) / total}%`,
        }}
        className={styles.done}
      />
    </div>
  );
};

export default ProgressBar;
