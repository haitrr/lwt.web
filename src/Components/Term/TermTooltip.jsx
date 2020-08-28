import PropTypes from "prop-types";
import { Tooltip } from "antd";
import React from "react";
import styles from "./Term.module.scss";
import TermButton from "./TermButton";

export const importantColors = [
  "#E50027",
  "#E5000F",
  "#E50800",
  "#E52000",
  "#E53800",
  "#E55000",
  "#E56800",
  "#E68000",
  "#E69701",
  "#E6AF01",
  "#E6C701",
  "#E6DF01",
  "#D6E601",
  "#BEE701",
  "#A7E701",
  "#8FE702",
  "#77E702",
  "#60E702",
  "#48E702",
  "#31E802",
  "#19E802",
  "#02E803",
  "#03E81B",
  "#03E833",
  "#03E84B",
  "#03E963",
  "#03E97B",
  "#03E993",
  "#03E9AB",
  "#04E9C3",
  "#04E9DB",
  "#04E0EA",
  "#04C9EA",
  "#04B1EA",
  "#0499EA",
  "#0482EA",
  "#056AEA",
  "#0553EB",
  "#053BEB",
  "#0523EB",
  "#050CEB",
  "#1705EB",
  "#2F05EB",
  "#4706EC",
  "#5F06EC",
  "#7706EC",
  "#8F06EC",
  "#A706EC",
  "#BF06EC",
  "#D707ED"
];
const renderTitle = term => (
  <span>
    {term.count ? (
      <div style={{ color: importantColors[Math.min(term.count, 49)] }}>
        {`${term.count} in this text.`}
      </div>
    ) : null}
    <span>{term.meaning}</span>
  </span>
);

const TermTooltip = ({
  bookmark,
  bookmarkRef,
  last,
  term,
  onClick,
  onHover
}) => (
  <Tooltip overlayClassName={styles.tooltip} title={renderTitle(term)}>
    <span onMouseEnter={onHover}>
      <TermButton
        bookmark={bookmark}
        bookmarkRef={bookmarkRef}
        last={last}
        term={term}
        onClick={onClick}
      />
    </span>
  </Tooltip>
);

TermTooltip.defaultProps = {
  bookmark: false,
  last: null
};

TermTooltip.propTypes = {
  term: PropTypes.shape({
    learningLevel: PropTypes.string.isRequired,
    meaning: PropTypes.string
  }).isRequired,
  bookmark: PropTypes.bool,
  bookmarkRef: PropTypes.shape({}).isRequired,
  last: PropTypes.shape({}),
  onClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired
};
export default TermTooltip;
