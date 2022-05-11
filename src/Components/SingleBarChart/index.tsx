import React from 'react';
import styles from './SingleBarChart.module.scss';
import BarChartItem, { Item } from './BarChartItem';

interface Props {
  data: Item[];
}

const SingleBarChart: React.FC<Props> = ({ data }) => {
  const sum = data.map((i) => i.value).reduce((a, b) => a + b);
  return (
    <span className={`${styles.bar}`}>
      {data.map((item) => (
        <BarChartItem item={item} sum={sum} />
      ))}
    </span>
  );
};

export default SingleBarChart;
