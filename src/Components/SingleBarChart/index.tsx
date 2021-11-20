import React from "react";
import classNames from "classnames";
import styles from "./SingleBarChart.module.scss";

const renderItem = (item: Item, sum: number) => {
  const className = classNames(styles.section, item.color);
  return item.value !== 0 ? (
    <span
      key={item.name}
      className={className}
      style={{
        paddingLeft: "0.2rem",
        paddingRight: "0.2rem",
        height: "100%",
        flex: item.value,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          height: "0.85rem",
        }}
      >
        {item.value}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          height: "0.85rem",
        }}
      >
        {`(${Math.round((item.value * 10000) / sum) / 100}%)`}
      </div>
    </span>
  ) : null;
};

interface Item {
  name: string;
  color: string;
  value: number;
}

interface Props {
  data: Item[]
}

const SingleBarChart: React.FC<Props> = ({data}) => {
  const sum = data.map((i) => i.value).reduce((a, b) => a + b);
  return (
    <span className={`${styles.bar}`}>
      {data.map((item) => renderItem(item, sum))}
    </span>
  );
};

export default SingleBarChart;
