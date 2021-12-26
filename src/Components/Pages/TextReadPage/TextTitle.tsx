import React from 'react';
import styles from './TextReadPage.module.scss';

interface Props {
  title: string;
}

const TextTitle: React.FC<Props> = ({ title }) => {
  if (window.innerWidth > 700) {
    return <div className={styles.titleSection}>{title}</div>;
  } else {
    // don't show title on mobile to save space
    return null;
  }
};

export default TextTitle;
