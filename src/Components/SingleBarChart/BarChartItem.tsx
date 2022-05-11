import React from 'react';
import classNames from 'classnames';
import styles from './SingleBarChart.module.scss';

export interface Item {
  name: string;
  color: string;
  value: number;
}

interface Props {
  item: Item;
  sum: number;
}

const BarChartItem: React.VFC<Props> = ({ item, sum }) => {
  const className = classNames(styles.section, item.color);
  return item.value !== 0 ? (
    <span
      key={item.name}
      className={className}
      style={{
        paddingLeft: '0.1rem',
        paddingRight: '0.1rem',
        height: '100%',
        flex: item.value,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          height: '0.85rem',
        }}
      >
        {item.value}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          height: '0.85rem',
        }}
      >
        {`${Math.round((item.value * 1000) / sum) / 10}%`}
      </div>
    </span>
  ) : null;
};

export default BarChartItem;
