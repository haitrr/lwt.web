import PropTypes from "prop-types";
import { Popover, Button } from "antd";
import React from "react";
import { connect } from "react-redux";
import styles from "./Term.module.scss";
import TermButton from "./TermButton";
import {
  dictionaryTermMeaningAction,
  editTermAction
} from "../../Actions/TermAction";
import { getNextLearningLevel, getPreviousLearningLevel } from "../../Enums";
import { selectDictionaryLanguage } from "../../Selectors/UserSelectors";

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

class TermTooltip extends React.Component {
  state = { loading: false };

  componentDidUpdate(prevProps) {
    const {
      term,
      index,
      dictionaryTerm,
      dictionaryLanguage,
      readingLanguageCode
    } = this.props;
    if (
      term &&
      prevProps.term &&
      prevProps.term.meaning === undefined &&
      term.meaning === ""
    ) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ loading: true }, () =>
        dictionaryTerm(
          term.content,
          readingLanguageCode,
          dictionaryLanguage,
          index
        ).then(() => this.setState({ loading: false }))
      );
    }
  }

  renderTitle = term => (
    <span>
      {term.count ? (
        <div style={{ color: importantColors[Math.min(term.count, 49)] }}>
          {`${term.count} in this text.`}
        </div>
      ) : null}
      <span>{term.meaning}</span>
    </span>
  );

  better = () => {
    const { term, editTerm } = this.props;
    const newTerm = {
      ...term,
      learningLevel: getNextLearningLevel(term.learningLevel)
    };
    editTerm(newTerm);
  };

  worse = () => {
    const { term, editTerm } = this.props;
    const newTerm = {
      ...term,
      learningLevel: getPreviousLearningLevel(term.learningLevel)
    };
    editTerm(newTerm);
  };

  renderContent = () => {
    const { term } = this.props;
    const { loading } = this.state;
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          type="primary"
          onClick={this.better}
          disabled={term.meaning === undefined || loading}
        >
          Better
        </Button>
        <Button
          type="primary"
          style={{ marginLeft: "5px" }}
          onClick={this.worse}
          disabled={term.meaning === undefined || loading}
        >
          Worse
        </Button>
      </div>
    );
  };

  render() {
    const { bookmark, bookmarkRef, last, term, onClick, onHover } = this.props;
    return (
      <Popover
        overlayClassName={styles.tooltip}
        title={this.renderTitle(term)}
        content={this.renderContent(term)}
        mouseLeaveDelay={0.3}
        mouseEnterDelay={0.3}
        destroyTooltipOnHide
      >
        <span onMouseEnter={onHover}>
          <TermButton
            bookmark={bookmark}
            bookmarkRef={bookmarkRef}
            last={last}
            term={term}
            onClick={onClick}
          />
        </span>
      </Popover>
    );
  }
}

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
  onHover: PropTypes.func.isRequired,
  editTerm: PropTypes.func.isRequired,
  dictionaryTerm: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  readingLanguageCode: PropTypes.string.isRequired,
  dictionaryLanguage: PropTypes.string.isRequired
};
export default connect(
  state => ({
    dictionaryLanguage: selectDictionaryLanguage(state),
    readingLanguageCode: state.text.readingText.languageCode
  }),
  {
    editTerm: editTermAction,
    dictionaryTerm: dictionaryTermMeaningAction
  }
)(TermTooltip);
