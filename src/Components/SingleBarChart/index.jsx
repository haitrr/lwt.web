import PropTypes from "prop-types";
import React from "react";
import styles from "./SingleBarChart.module.scss";

const SingleBarChart = ({ data }) => (
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
        </span>
      ) : null
    )}
  </span>
);

SingleBarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default SingleBarChart;
