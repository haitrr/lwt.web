import PropTypes from "prop-types";
import { Tooltip } from "antd";
import React from "react";
import styles from "./Term.module.scss";
import TermButton from "./TermButton";

const TermTooltip = ({
  bookmark,
  bookmarkRef,
  last,
  term,
  onClick,
  onHover
}) => {
  const title =
    term.meaning && term.meaning.length > 0 ? term.meaning : "-";
  return (
    <Tooltip overlayClassName={styles.tooltip} title={title}>
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
};

TermTooltip.defaultProps = {
  bookmark: false,
  last: null
};

TermTooltip.propTypes = {
  term: PropTypes.shape({
    learningLevel: PropTypes.number.isRequired,
    meaning: PropTypes.string
  }).isRequired,
  bookmark: PropTypes.bool,
  bookmarkRef: PropTypes.shape({}).isRequired,
  last: PropTypes.shape({}),
  onClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired
};
export default TermTooltip;
