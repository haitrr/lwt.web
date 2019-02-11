import PropTypes from "prop-types";
import React from "react";
import styles from "./SingleBarChart.module.scss";

const SingleBarChart = ({ data }) => {
  const sum = data.map(i => i.value).reduce((a, b) => a + b);
  return (
    <span className={styles.bar}>
      {data.map(item => (
        <span
          key={item.name}
          className={styles.section}
          style={{
            background: item.color,
            width: `${(item.value * 100) / sum}%`
          }}
        >
          {item.value}
        </span>
      ))}
    </span>
  );
};

SingleBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default SingleBarChart;
