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
              paddingLeft: "5px",
              paddingRight: "5px",
              flex: item.value,
              textAlign: "center"
            }}
          >
            {item.value}
            {`(${Math.round((item.value * 1000) / sum) / 10}%)`}
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
