import PropTypes from "prop-types";
import { Popper } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import {
  dictionaryTermMeaningAction,
  editTermAction,
} from "../../../Actions/TermAction";
import { getNextLearningLevel, getPreviousLearningLevel } from "../../../Enums";
import { selectDictionaryLanguage } from "../../../Selectors/UserSelectors";
import {
  selectTermAction,
  setBookmarkAction,
} from "../../../Actions/TextAction";
import normalize from "../../../textNormalizer";
import TermAnchor from "./TermAnchor";
import PopoverBody from "./PopoverBody";

class TermTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, dictionaried: false, anchorEl: null };
  }

  better = () => {
    const { term, editTerm } = this.props;
    const newTerm = {
      ...term,
      learningLevel: getNextLearningLevel(term.learningLevel),
    };
    editTerm(newTerm);
    this.handleSetBookmark();
  };

  handleSetBookmark = () => {
    const { textId, index, setBookmark, setSelectingTerm } = this.props;
    setBookmark(textId, index);
    setSelectingTerm(index);
  };

  worse = () => {
    const { term, editTerm } = this.props;
    const newTerm = {
      ...term,
      learningLevel: getPreviousLearningLevel(term.learningLevel),
    };
    editTerm(newTerm);
    this.handleSetBookmark();
  };

  speak = (e) => {
    e.preventDefault();
    const { onSpeak, term } = this.props;
    onSpeak(term);
    this.handleSetBookmark();
  };

  handleDictionaryTerm = () => {
    const {
      term,
      index,
      dictionaryTerm,
      dictionaryLanguage,
      readingLanguageCode,
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

  handleMouseEnter = (event) => {
    clearTimeout(this.hideTimout);
    clearTimeout(this.leavePopoverTimout);
    this.setState({ anchorEl: event.currentTarget });
    const { term } = this.props;
    const { dictionaried } = this.state;
    if (term && !dictionaried && term.meaning === "") {
      // eslint-disable-next-line react/no-did-update-set-state
      this.dictionaryTimeout = setTimeout(() => {
        this.handleDictionaryTerm();
      }, 100);
    }
    const { onHover } = this.props;
    this.hoverTimeout = setTimeout(onHover, 100);
  };

  handleMouseLeave = () => {
    this.hideTimout = setTimeout(() => {
      this.setState({ anchorEl: null });
    }, 100);
    clearTimeout(this.hoverTimeout);
    clearTimeout(this.dictionaryTimeout);
  };

  handlePopoverClose = () => {
    this.leavePopoverTimout = setTimeout(
      () => this.setState({ anchorEl: null }),
      100
    );
  };

  handleMouseEnterPopper = () => {
    clearTimeout(this.hideTimout);
    clearTimeout(this.leavePopoverTimout);
  };

  render() {
    const { bookmark, bookmarkRef, last, term, onClick } = this.props;
    const { anchorEl, loading } = this.state;
    const open = Boolean(anchorEl);
    return (
      <>
        <TermAnchor
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          bookmark={bookmark}
          bookmarkRef={bookmarkRef}
          last={last}
          term={term}
          onClick={onClick}
        />
        <Popper
          open={open}
          anchorEl={anchorEl}
          style={{ whiteSpace: "pre-line" }}
          placement="top"
          onClose={this.handlePopoverClose}
        >
          <PopoverBody
            onMouseEnter={this.handleMouseEnterPopper}
            onMouseLeave={this.handleMouseLeave}
            term={term}
            loading={loading}
            better={this.better}
            worse={this.worse}
          />
        </Popper>
      </>
    );
  }
}

TermTooltip.defaultProps = {
  bookmark: false,
  last: null,
};

TermTooltip.propTypes = {
  term: PropTypes.shape({
    learningLevel: PropTypes.string.isRequired,
    meaning: PropTypes.string,
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
  onSpeak: PropTypes.func.isRequired,
};
export default connect(
  (state) => ({
    dictionaryLanguage: selectDictionaryLanguage(state),
    readingLanguageCode: state.text.readingText.languageCode,
    textId: state.text.readingText.id,
  }),
  {
    editTerm: editTermAction,
    dictionaryTerm: dictionaryTermMeaningAction,
    setBookmark: setBookmarkAction,
    setSelectingTerm: selectTermAction,
  }
)(TermTooltip);
