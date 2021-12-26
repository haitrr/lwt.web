import React from 'react';
import { Fab } from '@mui/material';
import { connect } from 'react-redux';
import styles from './GoToBookmarkButton.module.scss';
import { RootState } from '../../../../RootReducer';

interface OwnProps {
  onClick: () => void;
}

interface StateProps {
  current: number;
  total: number;
}

type Props = OwnProps & StateProps;

const GoToBookmarkButton: React.FC<Props> = ({ onClick, current, total }) => (
  <Fab title="Go to bookmark" type="button" color="secondary" className={styles.button} onClick={onClick}>
    {`${Math.round((current / total) * 100 * 100) / 100}%`}
  </Fab>
);

export default connect<StateProps, null, OwnProps, RootState>((state: RootState) => {
  if (!state.text.readingText) throw new Error();
  return {
    current: state.text.readingText.bookmark,
    total: state.text.readingText.termCount,
  };
})(GoToBookmarkButton);
