import PropTypes from "prop-types";
import React from "react";
import styles from "./SingleBarChart.module.scss";

const SingleBarChart = ({ data }) => {
  const sum = data.map(i => i.value).reduce((a, b) => a + b);
  return (
    <span className={styles.bar}>
      {data.map(item =>
        item.value !== 0 ? (
          <span
            key={item.name}
            className={styles.section}
            style={{
              background: item.color,
              width: `${(item.value * 100) / sum}%`,
              textAlign: "center"
            }}
          >
            <span style={{ position: "relative", zIndex: 10 }}>
              {item.value}
            </span>
          </span>
        ) : null
      )}
    </span>
  );
};

SingleBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default SingleBarChart;
