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
import {
  getNextLearningLevel,
  getPreviousLearningLevel,
  importantColors
} from "../../Enums";
import { selectDictionaryLanguage } from "../../Selectors/UserSelectors";
import { setBookmarkAction, selectTermAction } from "../../Actions/TextAction";
import normalize from "../../textNormalizer";

class TermTooltip extends React.Component {
  state = { loading: false, dictionaried: false };

  renderTitle = () => {
    const { term } = this.props;
    return (
      <span>
        {term.count ? (
          <div style={{ color: importantColors[Math.min(term.count, 49)] }}>
            {`${term.count} in this text.`}
          </div>
        ) : (
          <div>Loading term count</div>
        )}
        <span>{term.meaning}</span>
      </span>
    );
  };

  better = e => {
    e.preventDefault();
    const { term, editTerm } = this.props;
    const newTerm = {
      ...term,
      learningLevel: getNextLearningLevel(term.learningLevel)
    };
    editTerm(newTerm);
    this.handleSetBookmark();
  };

  handleSetBookmark = () => {
    const { textId, index, setBookmark, setSelectingTerm } = this.props;
    setBookmark(textId, index);
    setSelectingTerm(index);
  };

  worse = e => {
    e.preventDefault();
    const { term, editTerm } = this.props;
    const newTerm = {
      ...term,
      learningLevel: getPreviousLearningLevel(term.learningLevel)
    };
    editTerm(newTerm);
    this.handleSetBookmark();
  };

  speak = e => {
    e.preventDefault();
    const { onSpeak, term } = this.props;
    onSpeak(term);
  };

  renderContent = () => {
    const { term } = this.props;
    const { loading } = this.state;
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          type="primary"
          onClick={this.better}
          disabled={term.meaning === null || loading}
        >
          Better
        </Button>
        <Button
          type="primary"
          style={{ marginLeft: "5px" }}
          onClick={this.worse}
          disabled={term.meaning === null || loading}
        >
          Worse
        </Button>
        <Button
          type="primary"
          style={{ marginLeft: "5px" }}
          onClick={this.speak}
        >
          Speak
        </Button>
      </div>
    );
  };

  handleDictionaryTerm = () => {
    const {
      term,
      index,
      dictionaryTerm,
      dictionaryLanguage,
      readingLanguageCode
    } = this.props;
    const { dictionaried } = this.state;
    if (term && !dictionaried && term.meaning === "") {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ loading: true, dictionaried: true }, () =>
        dictionaryTerm(
          normalize(term.content, readingLanguageCode),
          readingLanguageCode,
          dictionaryLanguage,
          index
        ).then(() => this.setState({ loading: false }))
      );
    }
  };

  handleMouseEnter = () => {
    const { term } = this.props;
    const { dictionaried } = this.state;
    if (term && !dictionaried && term.meaning === "") {
      // eslint-disable-next-line react/no-did-update-set-state
      this.dictionaryTimeout = setTimeout(() => {
        this.handleDictionaryTerm();
      }, 200);
    }
    const { onHover } = this.props;
    this.hoverTimeout = setTimeout(onHover, 200);
  };

  handleMouseLeave = () => {
    clearTimeout(this.hoverTimeout);
    clearTimeout(this.dictionaryTimeout);
  };

  render() {
    const { bookmark, bookmarkRef, last, term, onClick } = this.props;
    return (
      <Popover
        overlayClassName={styles.tooltip}
        title={this.renderTitle()}
        content={this.renderContent()}
        mouseLeaveDelay={0.5}
        mouseEnterDelay={0.5}
        destroyTooltipOnHide
      >
        <span
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
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
  dictionaryLanguage: PropTypes.string.isRequired,
  setBookmark: PropTypes.func.isRequired,
  textId: PropTypes.number.isRequired,
  setSelectingTerm: PropTypes.func.isRequired,
  onSpeak: PropTypes.func.isRequired
};
export default connect(
  state => ({
    dictionaryLanguage: selectDictionaryLanguage(state),
    readingLanguageCode: state.text.readingText.languageCode,
    textId: state.text.readingText.id
  }),
  {
    editTerm: editTermAction,
    dictionaryTerm: dictionaryTermMeaningAction,
    setBookmark: setBookmarkAction,
    setSelectingTerm: selectTermAction
  }
)(TermTooltip);
