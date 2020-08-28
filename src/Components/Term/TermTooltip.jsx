import PropTypes from "prop-types";
import { Tooltip } from "antd";
import React from "react";
import styles from "./Term.module.scss";
import TermButton from "./TermButton";

export const importantColors = [
  "#E50027",
  "#E40010",
  "#E30500",
  "#E21C00",
  "#E13200",
  "#E14800",
  "#E05D00",
  "#DF7300",
  "#DE8800",
  "#DE9E00",
  "#DDB300",
  "#DCC800",
  "#DADB00",
  "#C3DA00",
  "#ADDA00",
  "#97D900",
  "#81D800",
  "#6CD700",
  "#56D700",
  "#41D600",
  "#2CD500",
  "#17D400",
  "#02D300",
  "#00D312",
  "#00D226",
  "#00D13B",
  "#00D04F",
  "#00D063",
  "#00CF77",
  "#00CE8B",
  "#00CD9F",
  "#00CCB2",
  "#00CCC6",
  "#00BDCB",
  "#00A8CA",
  "#0094C9",
  "#0080C9",
  "#006BC8",
  "#0057C7",
  "#0044C6",
  "#0030C5",
  "#001CC5",
  "#0009C4",
  "#0900C3",
  "#1C00C2",
  "#2F00C2",
  "#4200C1",
  "#5500C0",
  "#6700BF",
  "#7A00BF"
];
const renderTitle = term => (
  <span>
    {term.count ? (
      <div style={{ color: importantColors[term.count % 50] }}>
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
